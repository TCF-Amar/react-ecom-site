import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrUpdateReview, deleteProductReview, fetchProductBySlugFromFirestore, fetchProductReviewsFromFirestore, fetchRelatedProductsFromFirestore } from "../productFirebaseServices";
import type { Product, Review } from "../productTypes";
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";

export const useProductDetails = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [selectedStar, setSelectedStar] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [addingReview, setAddingReview] = useState(false);


    const [slug, setSlug] = useState<string | null>(
        location.pathname.split("/").findLast(Boolean) as string,
    );


    const fetchRelatedProduct = async (categoryId: number | null) => {
        const relatedData = await fetchRelatedProductsFromFirestore({
            categoryId,

        });

        setRelatedProduct(relatedData);
    }

    const fetchReviews = async (productId: string) => {
        setReviewsLoading(true);
        try {
            const productReviews = await fetchProductReviewsFromFirestore(productId);
            setReviews(productReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error("Failed to load reviews.");
        } finally {
            setReviewsLoading(false);
        }
    }

    const fetProduct = async () => {

        setLoading(true);
        try {

            const data = await fetchProductBySlugFromFirestore(slug?.toString() || "");
            setProduct(data);
            if (data) {
                fetchRelatedProduct(data.category?.id || null);
                fetchReviews(data.id);
            } else {
                setRelatedProduct([]);
                setReviews([]);
            }
            setLoading(false);
        } catch (error: unknown) {
            console.log(error);


        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSlug(location.pathname.split("/").findLast(Boolean) as string);
        console.log(slug);


        fetProduct();
    }, [slug, location.pathname]);



    const addReviews = async () => {
        setAddingReview(true);
        try {
            if (!user) {
                navigate("/login");
                return;
            }
            if (selectedStar === 0) {
                toast.error("Please select a star rating before submitting your review.");
                return;
            }

            if (!product) {
                toast.error("Product not found.");
                return;
            }

            const review: Review = {
                id: Date.now().toString(),
                productId: product.id,
                comment: comment.trim(),
                userId: user!.uid,
                userName: user?.displayName || "John Doe",
                rating: selectedStar,
                createdAt: new Date(),
                updatedAt: new Date(),
                isEdited: false,
                isDeleted: false
            }
            const updatedProductRating = await addOrUpdateReview(review)
            await fetchReviews(product.id);
            setProduct((prev) =>
                prev
                    ? {
                        ...prev,
                        rating: updatedProductRating.rating,
                        reviewCount: updatedProductRating.reviewCount,
                    }
                    : prev
            );
            setSelectedStar(0);
            setComment("");
            setEditingReviewId(null);
            toast.success(
                updatedProductRating.type === "edited"
                    ? "Review updated successfully."
                    : "Review submitted successfully."
            );

        } catch (error) {
            console.error("Error adding review:", error);
            toast.error("Failed to submit review.");
        } finally {
            setAddingReview(false);
        }
    }

    const startEditReview = (review: Review) => {
        setEditingReviewId(review.id);
        setSelectedStar(review.rating);
        setComment(review.comment);
    }

    const cancelEditReview = () => {
        setEditingReviewId(null);
        setSelectedStar(0);
        setComment("");
    }

    const deleteReview = async (review: Review) => {
        setAddingReview(true);
        try {
            if (!user) {
                navigate("/login");
                return;
            }
            if (!product) {
                toast.error("Product not found.");
                return;
            }
            if (review.userId !== user.uid) {
                toast.error("You can delete only your own review.");
                return;
            }

            const confirmation = confirm("Do you want to delete this review?");
            if (!confirmation) return;

            const updatedProductRating = await deleteProductReview({
                productId: product.id,
                userId: user.uid,
            });

            setReviews((prev) => prev.filter((item) => item.id !== review.id));
            setProduct((prev) =>
                prev
                    ? {
                        ...prev,
                        rating: updatedProductRating.rating,
                        reviewCount: updatedProductRating.reviewCount,
                    }
                    : prev
            );
            cancelEditReview();
            toast.success("Review deleted successfully.");
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("Failed to delete review.");
        } finally {
            setAddingReview(false);
        }
    }

    return {
        navigate,
        relatedProduct,
        loading,
        product, selectedStar, setSelectedStar, addReviews, comment,
        setComment,
        reviews,
        reviewsLoading,
        editingReviewId,
        startEditReview,
        cancelEditReview,
        deleteReview,
        userId: user?.uid || null,
        addingReview,

    }
}
