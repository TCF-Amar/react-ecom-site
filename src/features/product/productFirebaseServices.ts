import { collection, doc, getDocs, limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot, runTransaction, startAfter, Timestamp, where, type DocumentData } from "firebase/firestore"
import { db } from "../../config/firebaseConfigure"
import type { Category, Product, Review } from "./productTypes";


interface FetchParams {
    last?: QueryDocumentSnapshot<DocumentData>;
    search?: string;
    categoryId?: number[] | null;
    limitCount: number;
    minPrize?: number;
    maxPrize?: number;
    sortBy?: "price" | "rating" | "createdAt" | "title";
    sortOrder?: "asc" | "desc";
}

const mapProduct = (doc: QueryDocumentSnapshot<DocumentData>): Product => {
    const data = doc.data();

    return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        price: data.price,
        description: data.description,
        images: data.images || [],
        category: data.category,
        rating: data.rating ?? 0,
        reviewCount: data.reviewCount ?? 0,

        createdAt: data.createdAt?.milliseconds || "",
        updatedAt: data.updatedAt?.milliseconds || "",
    };
};

const toDateValue = (value: any) => {
    if (value instanceof Timestamp) return value.toDate();
    return value ?? "";
};

const mapReview = (doc: QueryDocumentSnapshot<DocumentData>): Review => {
    const data = doc.data();

    return {
        id: data.id || doc.id,
        productId: data.productId,
        userId: data.userId,
        userName: data.userName,
        userAvatar: data.userAvatar,
        rating: data.rating ?? 0,
        comment: data.comment ?? "",
        createdAt: toDateValue(data.createdAt),
        updatedAt: toDateValue(data.updatedAt),
        isEdited: data.isEdited ?? false,
        isDeleted: data.isDeleted ?? false,
        type: data.type,
    };
};
export const fetchProductsFromFirestore = async (
    params: FetchParams
): Promise<{
    products: Product[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
    try {
        const { last, search, categoryId, limitCount, minPrize, maxPrize, sortBy, sortOrder } = params;

        const constraints: QueryConstraint[] = [];


        if (search?.trim()) {
            const keyword = search.trim().toLowerCase().split(" ")[0];
            constraints.push(
                where("searchKeywords", "array-contains", keyword)
            );
        }


        if (categoryId != null && categoryId.length > 0) {
            constraints.push(where("category.id", "in", categoryId));
        }

        if (minPrize != null && maxPrize != null) {
            constraints.push(where("price", ">=", minPrize));
            constraints.push(where("price", "<=", maxPrize));
        }
        else if (minPrize != null) {
            constraints.push(where("price", ">=", minPrize));
        }
        else if (maxPrize != null) {
            constraints.push(where("price", "<=", maxPrize));
        }

        switch (sortBy) {
            case "price":
                constraints.push(orderBy("price", sortOrder));
                break;
            case "rating":
                constraints.push(orderBy("rating", sortOrder));
                break;
            case "createdAt":
                constraints.push(orderBy("createdAt", "desc"));
                break;
            case "title":
                constraints.push(orderBy("title", sortOrder));
                break;
            default:
                break;
        }

        if (last) {
            constraints.push(startAfter(last));
        }

        constraints.push(limit(limitCount));

        const q = query(collection(db, "products"), ...constraints);

        const snapshot = await getDocs(q);

        const products: Product[] = snapshot.docs.map(mapProduct);
        

        return {
            products,
            lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        };
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
};


export const fetchCategoriesFromFirestore = async (): Promise<Category[]> => {
    try {
        const snapshot = await getDocs(collection(db, "categories"));

        const categories: Category[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Category & {
                createdAt?: any;
                updatedAt?: any;
            };

            return {
                ...data,

                id: data.id,
                createdAt:
                    data.createdAt instanceof Timestamp
                        ? data.createdAt.toDate().toISOString()
                        : data.createdAt ?? "",

                updatedAt:
                    data.updatedAt instanceof Timestamp
                        ? data.updatedAt.toDate().toISOString()
                        : data.updatedAt ?? "",
            };
        });

        return categories;
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
};


export const fetchProductBySlugFromFirestore = async (slug: string) => {
    try {
        const q = query(
            collection(db, "products"),
            where("slug", "==", slug)
        )

        const snapshot = await getDocs(q)

        const product = snapshot.docs[0] ? mapProduct(snapshot.docs[0]) : null;
        console.log(product);
        return product;

    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
}

export const fetchRelatedProductsFromFirestore = async ({
    categoryId }: {
        categoryId: number | null;
    }) => {
    try {
        const constraint: QueryConstraint[] = [];
        if (categoryId != null) constraint.push(where("category.id", "==", categoryId))
        const q = query(collection(db, "products"), ...constraint);
        const snapshot = await getDocs(q);
        const products: Product[] = snapshot.docs.map(mapProduct);
        return products;

    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
}

export const fetchProductReviewsFromFirestore = async (productId: string): Promise<Review[]> => {
    try {
        const q = query(
            collection(db, "reviews"),
            where("productId", "==", productId),
            where("isDeleted", "==", false)
        );

        const snapshot = await getDocs(q);
        const reviews = snapshot.docs.map(mapReview);

        return reviews.sort((a, b) => {
            const bDate = new Date(b.updatedAt).getTime();
            const aDate = new Date(a.updatedAt).getTime();
            return bDate - aDate;
        });
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
};

interface Params {
    productId: string;
    newRating?: number;
    oldRating?: number;
    type: "add" | "update" | "delete";
}

export const updateProductRating = async ({
    productId,
    newRating = 0,
    oldRating = 0,
    type,
}: Params) => {
    const productRef = doc(db, "products", productId);

    await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(productRef);

        if (!snap.exists()) throw new Error("Product not found");

        const data = snap.data();

        let avg = data.rating || 0;
        let count = data.reviewCount || 0;


        if (type === "add") {
            avg = ((avg * count) + newRating) / (count + 1);
            count += 1;
        }

        if (type === "update") {
            avg = ((avg * count) - oldRating + newRating) / count;
        }

        if (type === "delete") {
            avg = ((avg * count) - oldRating) / (count - 1);
            count -= 1;
        }

        if (count <= 0) {
            avg = 0;
            count = 0;
        }

        transaction.update(productRef, {
            rating: Number(avg.toFixed(1)),
            reviewCount: count,
            updatedAt: new Date(),
        });

    });

};

export const addOrUpdateReview = async (review: Review) => {
    try {
        if (!review.productId) throw new Error("Product id is required");
        if (!review.userId) throw new Error("User id is required");

        const reviewId = `${review.productId}_${review.userId}`;

        const reviewRef = doc(db, "reviews", reviewId);
        const productRef = doc(db, "products", review.productId);

        return await runTransaction(db, async (transaction) => {
            const productSnap = await transaction.get(productRef);
            const reviewSnap = await transaction.get(reviewRef);

            if (!productSnap.exists()) throw new Error("Product not found");

            const productData = productSnap.data();
            const existingReview = reviewSnap.exists() ? reviewSnap.data() : null;
            const hasActiveReview = !!existingReview && existingReview.isDeleted !== true;

            const newRating = Number(review.rating);
            const oldRating = Number(existingReview?.rating ?? 0);

            let avg = Number(productData.rating ?? 0);
            let count = Number(productData.reviewCount ?? 0);

            if (hasActiveReview) {
                avg = count > 0 ? ((avg * count) - oldRating + newRating) / count : newRating;
            } else {
                avg = ((avg * count) + newRating) / (count + 1);
                count += 1;
            }

            const now = Timestamp.now();
            const roundedRating = Number(avg.toFixed(1));

            transaction.set(
                reviewRef,
                {
                    ...review,
                    id: reviewId,
                    createdAt: existingReview?.createdAt ?? now,
                    updatedAt: now,
                    isEdited: hasActiveReview,
                    isDeleted: false,
                    type: hasActiveReview ? "edited" : "new",
                },
                { merge: true }
            );

            transaction.update(productRef, {
                rating: roundedRating,
                reviewCount: count,
                updatedAt: now,
            });

            return {
                reviewId,
                rating: roundedRating,
                reviewCount: count,
                type: hasActiveReview ? "edited" : "new",
            };
        });
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
};

export const deleteProductReview = async ({
    productId,
    userId,
}: {
    productId: string;
    userId: string;
}) => {
    try {
        if (!productId) throw new Error("Product id is required");
        if (!userId) throw new Error("User id is required");

        const reviewId = `${productId}_${userId}`;
        const reviewRef = doc(db, "reviews", reviewId);
        const productRef = doc(db, "products", productId);

        return await runTransaction(db, async (transaction) => {
            const productSnap = await transaction.get(productRef);
            const reviewSnap = await transaction.get(reviewRef);

            if (!productSnap.exists()) throw new Error("Product not found");
            if (!reviewSnap.exists()) throw new Error("Review not found");

            const productData = productSnap.data();
            const reviewData = reviewSnap.data();

            if (reviewData.isDeleted === true) {
                return {
                    rating: Number(productData.rating ?? 0),
                    reviewCount: Number(productData.reviewCount ?? 0),
                };
            }

            const oldRating = Number(reviewData.rating ?? 0);
            let count = Number(productData.reviewCount ?? 0);
            let avg = Number(productData.rating ?? 0);

            if (count <= 1) {
                count = 0;
                avg = 0;
            } else {
                avg = ((avg * count) - oldRating) / (count - 1);
                count -= 1;
            }

            const roundedRating = Number(avg.toFixed(1));
            const now = Timestamp.now();

            transaction.update(reviewRef, {
                isDeleted: true,
                type: "deleted",
                updatedAt: now,
            });

            transaction.update(productRef, {
                rating: roundedRating,
                reviewCount: count,
                updatedAt: now,
            });

            return {
                rating: roundedRating,
                reviewCount: count,
            };
        });
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
};
