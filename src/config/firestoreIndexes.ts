/**
 * Firestore Indexes Configuration
 * 
 * This file documents all composite indexes required for optimal Firestore query performance.
 * These indexes should be created in Firebase Console or applied using Firebase CLI.
 * 
 * Reference: https://firebase.google.com/docs/firestore/query-data/index-overview
 */

/**
 * Composite Indexes Required for Products Collection
 * 
 * Firestore automatically handles single-field queries, but composite queries
 * (multiple filters + sorting) require manual index creation.
 */

export const FIRESTORE_INDEXES = {
  /**
   * Products Collection Indexes - All Query Combinations
   */
  products: {
    // ============ PRICE FILTER COMBINATIONS ============
    priceAsc: {
      collection: "products",
      fields: [
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by price range, sort ascending",
      queryExample: "where price >= X and price <= Y orderBy price asc",
    },

    priceDesc: {
      collection: "products",
      fields: [
        { fieldPath: "price", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by price range, sort descending",
      queryExample: "where price >= X and price <= Y orderBy price desc",
    },

    priceWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by price and sort by rating descending",
      queryExample: "where price >= X and price <= Y orderBy rating desc",
    },

    priceWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by price and sort by rating ascending",
      queryExample: "where price >= X and price <= Y orderBy rating asc",
    },

    priceWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by price and sort by title",
      queryExample: "where price >= X and price <= Y orderBy title asc",
    },

    priceWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by price and sort by created date",
      queryExample: "where price >= X and price <= Y orderBy createdAt desc",
    },

    // ============ CATEGORY FILTER COMBINATIONS ============
    categoryWithPriceAsc: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by category and sort by price ascending",
      queryExample: "where category.id in [...] orderBy price asc",
    },

    categoryWithPriceDesc: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by category and sort by price descending",
      queryExample: "where category.id in [...] orderBy price desc",
    },

    categoryWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by category and sort by rating descending",
      queryExample: "where category.id in [...] orderBy rating desc",
    },

    categoryWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by category and sort by rating ascending",
      queryExample: "where category.id in [...] orderBy rating asc",
    },

    categoryWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by category and sort by title",
      queryExample: "where category.id in [...] orderBy title asc",
    },

    categoryWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Filter by category and sort by created date",
      queryExample: "where category.id in [...] orderBy createdAt desc",
    },

    // ============ SEARCH KEYWORD COMBINATIONS ============
    searchWithPriceAsc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search by keywords and sort by price ascending",
      queryExample: "where searchKeywords array-contains X orderBy price asc",
    },

    searchWithPriceDesc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "price", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search by keywords and sort by price descending",
      queryExample: "where searchKeywords array-contains X orderBy price desc",
    },

    searchWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search by keywords and sort by rating descending",
      queryExample: "where searchKeywords array-contains X orderBy rating desc",
    },

    searchWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search by keywords and sort by rating ascending",
      queryExample: "where searchKeywords array-contains X orderBy rating asc",
    },

    searchWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search by keywords and sort by title",
      queryExample: "where searchKeywords array-contains X orderBy title asc",
    },

    searchWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search by keywords and sort by created date",
      queryExample: "where searchKeywords array-contains X orderBy createdAt desc",
    },

    // ============ SEARCH + CATEGORY COMBINATIONS ============
    searchCategoryWithPriceAsc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category filter, sort by price ascending",
      queryExample: "where searchKeywords array-contains X and category.id in [...] orderBy price asc",
    },

    searchCategoryWithPriceDesc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category filter, sort by price descending",
      queryExample: "where searchKeywords array-contains X and category.id in [...] orderBy price desc",
    },

    searchCategoryWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category filter, sort by rating descending",
      queryExample: "where searchKeywords array-contains X and category.id in [...] orderBy rating desc",
    },

    searchCategoryWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category filter, sort by rating ascending",
      queryExample: "where searchKeywords array-contains X and category.id in [...] orderBy rating asc",
    },

    searchCategoryWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category filter, sort by title",
      queryExample: "where searchKeywords array-contains X and category.id in [...] orderBy title asc",
    },

    searchCategoryWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category filter, sort by created date",
      queryExample: "where searchKeywords array-contains X and category.id in [...] orderBy createdAt desc",
    },

    // ============ SEARCH + PRICE COMBINATIONS ============
    searchPriceWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + price filter, sort by rating descending",
      queryExample: "where searchKeywords array-contains X and price >= Y orderBy rating desc",
    },

    searchPriceWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + price filter, sort by rating ascending",
      queryExample: "where searchKeywords array-contains X and price >= Y orderBy rating asc",
    },

    searchPriceWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + price filter, sort by title",
      queryExample: "where searchKeywords array-contains X and price >= Y orderBy title asc",
    },

    searchPriceWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + price filter, sort by created date",
      queryExample: "where searchKeywords array-contains X and price >= Y orderBy createdAt desc",
    },

    // ============ SEARCH + CATEGORY + PRICE COMBINATIONS ============
    searchCategoryPriceWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category + price filters, sort by rating descending",
      queryExample: "where searchKeywords array-contains X and category.id in [...] and price >= Y orderBy rating desc",
    },

    searchCategoryPriceWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category + price filters, sort by rating ascending",
      queryExample: "where searchKeywords array-contains X and category.id in [...] and price >= Y orderBy rating asc",
    },

    searchCategoryPriceWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category + price filters, sort by title",
      queryExample: "where searchKeywords array-contains X and category.id in [...] and price >= Y orderBy title asc",
    },

    searchCategoryPriceWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "searchKeywords", order: "ASCENDING" },
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Search + category + price filters, sort by created date",
      queryExample: "where searchKeywords array-contains X and category.id in [...] and price >= Y orderBy createdAt desc",
    },

    // ============ CATEGORY + PRICE COMBINATIONS ============
    categoryPriceWithRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Category + price filters, sort by rating descending",
      queryExample: "where category.id in [...] and price >= X orderBy rating desc",
    },

    categoryPriceWithRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Category + price filters, sort by rating ascending",
      queryExample: "where category.id in [...] and price >= X orderBy rating asc",
    },

    categoryPriceWithTitle: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Category + price filters, sort by title",
      queryExample: "where category.id in [...] and price >= X orderBy title asc",
    },

    categoryPriceWithCreatedAt: {
      collection: "products",
      fields: [
        { fieldPath: "category.id", order: "ASCENDING" },
        { fieldPath: "price", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Category + price filters, sort by created date",
      queryExample: "where category.id in [...] and price >= X orderBy createdAt desc",
    },

    // ============ STANDALONE SORT COMBINATIONS ============
    sortByCreatedAtDesc: {
      collection: "products",
      fields: [
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Sort products by creation date descending",
      queryExample: "orderBy createdAt desc with pagination",
    },

    sortByCreatedAtAsc: {
      collection: "products",
      fields: [
        { fieldPath: "createdAt", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Sort products by creation date ascending",
      queryExample: "orderBy createdAt asc with pagination",
    },

    sortByRatingDesc: {
      collection: "products",
      fields: [
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Sort products by rating descending",
      queryExample: "orderBy rating desc with pagination",
    },

    sortByRatingAsc: {
      collection: "products",
      fields: [
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Sort products by rating ascending",
      queryExample: "orderBy rating asc with pagination",
    },

    sortByTitleAsc: {
      collection: "products",
      fields: [
        { fieldPath: "title", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Sort products by title ascending",
      queryExample: "orderBy title asc with pagination",
    },

    sortByTitleDesc: {
      collection: "products",
      fields: [
        { fieldPath: "title", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Sort products by title descending",
      queryExample: "orderBy title desc with pagination",
    },
  },

  /**
   * Reviews Collection Indexes - All Query Combinations
   */
  reviews: {
    // ============ PRODUCT REVIEWS COMBINATIONS ============
    productReviewsUpdatedDesc: {
      collection: "reviews",
      fields: [
        { fieldPath: "productId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "updatedAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews for a product, sorted by update date descending",
      queryExample: "where productId == X and isDeleted == false orderBy updatedAt desc",
    },

    productReviewsUpdatedAsc: {
      collection: "reviews",
      fields: [
        { fieldPath: "productId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "updatedAt", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews for a product, sorted by update date ascending",
      queryExample: "where productId == X and isDeleted == false orderBy updatedAt asc",
    },

    productReviewsCreatedDesc: {
      collection: "reviews",
      fields: [
        { fieldPath: "productId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews for a product, sorted by creation date descending",
      queryExample: "where productId == X and isDeleted == false orderBy createdAt desc",
    },

    productReviewsCreatedAsc: {
      collection: "reviews",
      fields: [
        { fieldPath: "productId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews for a product, sorted by creation date ascending",
      queryExample: "where productId == X and isDeleted == false orderBy createdAt asc",
    },

    productReviewsWithRatingDesc: {
      collection: "reviews",
      fields: [
        { fieldPath: "productId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews for a product, sorted by rating descending",
      queryExample: "where productId == X and isDeleted == false orderBy rating desc",
    },

    productReviewsWithRatingAsc: {
      collection: "reviews",
      fields: [
        { fieldPath: "productId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews for a product, sorted by rating ascending",
      queryExample: "where productId == X and isDeleted == false orderBy rating asc",
    },

    // ============ USER REVIEWS COMBINATIONS ============
    userReviewsUpdatedDesc: {
      collection: "reviews",
      fields: [
        { fieldPath: "userId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "updatedAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews by a user, sorted by update date descending",
      queryExample: "where userId == X and isDeleted == false orderBy updatedAt desc",
    },

    userReviewsUpdatedAsc: {
      collection: "reviews",
      fields: [
        { fieldPath: "userId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "updatedAt", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews by a user, sorted by update date ascending",
      queryExample: "where userId == X and isDeleted == false orderBy updatedAt asc",
    },

    userReviewsCreatedDesc: {
      collection: "reviews",
      fields: [
        { fieldPath: "userId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews by a user, sorted by creation date descending",
      queryExample: "where userId == X and isDeleted == false orderBy createdAt desc",
    },

    userReviewsCreatedAsc: {
      collection: "reviews",
      fields: [
        { fieldPath: "userId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "createdAt", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews by a user, sorted by creation date ascending",
      queryExample: "where userId == X and isDeleted == false orderBy createdAt asc",
    },

    userReviewsWithRatingDesc: {
      collection: "reviews",
      fields: [
        { fieldPath: "userId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "rating", order: "DESCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews by a user, sorted by rating descending",
      queryExample: "where userId == X and isDeleted == false orderBy rating desc",
    },

    userReviewsWithRatingAsc: {
      collection: "reviews",
      fields: [
        { fieldPath: "userId", order: "ASCENDING" },
        { fieldPath: "isDeleted", order: "ASCENDING" },
        { fieldPath: "rating", order: "ASCENDING" },
        { fieldPath: "__name__", order: "DESCENDING" },
      ],
      description: "Fetch active reviews by a user, sorted by rating ascending",
      queryExample: "where userId == X and isDeleted == false orderBy rating asc",
    },
  },
};

/**
 * Firebase CLI Command to Create Indexes
 * 
 * You can use Firebase CLI to deploy these indexes:
 * 1. Create a firestore.indexes.json file with the index configurations
 * 2. Run: firebase deploy --only firestore:indexes
 * 
 * Alternatively, create indexes manually in Firebase Console:
 * https://console.firebase.google.com/project/YOUR_PROJECT/firestore/indexes/composite
 */

/**
 * Helper function to generate Firestore index configuration JSON
 */
export const generateFirestoreIndexConfig = () => {
  const indexes = Object.values(FIRESTORE_INDEXES)
    .flatMap((collectionIndexes) => Object.values(collectionIndexes))
    .filter(
      (index) =>
        index.fields && Array.isArray(index.fields) && index.fields.length > 1
    );

  return {
    indexes: indexes.map((index) => ({
      collectionGroup: index.collection,
      queryScope: "COLLECTION",
      fields: index.fields,
    })),
  };
};

/**
 * Performance Tips:
 * 1. Composite indexes are only needed for queries with:
 *    - Multiple where clauses
 *    - Ordering on different fields than filter fields
 * 
 * 2. Single-field queries are automatically indexed by Firestore
 * 
 * 3. Monitor your Firestore console for "index suggestion" notifications
 *    - Firestore will suggest missing indexes for slow queries
 * 
 * 4. Test with smaller datasets first to verify index effectiveness
 */
