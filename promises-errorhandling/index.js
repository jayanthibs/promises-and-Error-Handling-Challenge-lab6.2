// importing all the functions needed for this file
import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  NetworkError,
  DataError,
} from "./apiSimulator.js";

fetchProductCatalog() // returns a promise object
  .then((productCatalog) => {
    //printing all the products in the catalog
    console.log("Products :", productCatalog);

    // Create an array of promises for all product reviews
    const reviewPromises = productCatalog.map((product) =>
      fetchProductReviews(product.id)
        .then((reviews) => {
          console.log(`Reviews for Product ${product.id}:`, reviews);
          return reviews; // return reviews if needed later
        })
        // Handle errors for individual product review fetches
        .catch((error) => {
          if (error instanceof NetworkError) {
            console.log("Network Error", error.message);
          } else if (error instanceof DataError) {
            console.log("Data Error", error);
          } else {
            console.error("Unknown Error:", error);
          }
          return []; // fallback so Promise.all continues
        }),
    );

    // Wait for all review fetches to complete
    return Promise.all(reviewPromises).then(() => productCatalog);
  })
  .then((productCatalog) => {
    // Fetch sales report only if catalog succeeded
    if (productCatalog.length === 0) {
      console.log("Catalog failed, skipping sales report.");
      return;
    }

    return (
      fetchSalesReport()
        .then((salesReport) => {
          //printing the sales report
          console.log("Sales Report:", salesReport);
        })
        // Handle errors for sales report fetch
        .catch((error) => {
          if (error instanceof NetworkError) {
            console.log("Network Error", error.message);
          } else if (error instanceof DataError) {
            console.log("Data Error", error);
          } else {
            console.error("Unknown Error:", error);
          }
        })
    );
  })
  // Handle errors from fetching the catalog
  .catch((error) => {
    if (error instanceof NetworkError) {
      console.log("Network Error", error.message);
    } else if (error instanceof DataError) {
      console.log("Data Error", error);
    } else {
      console.error("Unknown Error:", error);
    }
  })
  // Always runs at the end
  .finally(() => {
    console.log("Complete.");
  });

// fetch reviews for single product  - add it at line13

//   return fetchProductReviews(productCatalog[1].id); // returns a promise object
// })

// .then((productReviews) => {
//   console.log("Reviews for Product " + productReviews[0].productId + ":");
//   console.log(productReviews);
//   return fetchSalesReport(); // returns a promise object
// })
