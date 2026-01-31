import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  NetworkError,
  DataError,
} from "./apiSimulator.js";

fetchProductCatalog() // returns a promise object
  .then((productCatalog) => {
    console.log("Products :", productCatalog);

    // Create an array of promises for all product reviews
    const reviewPromises = productCatalog.map((product) =>
      fetchProductReviews(product.id)
        .then((reviews) => {
          console.log(`Reviews for Product ${product.id}:`, reviews);
          return reviews; // return reviews if needed later
        })
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
    if (productCatalog.length === 0) {
      console.log("Catalog failed, skipping sales report.");
      return;
    }

    return fetchSalesReport()
      .then((salesReport) => {
        console.log("Sales Report:", salesReport);
      })

      .catch((error) => {
        if (error instanceof NetworkError) {
          console.log("Network Error", error.message);
        } else if (error instanceof DataError) {
          console.log("Data Error", error);
        } else {
          console.error("Unknown Error:", error);
        }
      });
  })
  .catch((error) => {
    if (error instanceof NetworkError) {
      console.log("Network Error", error.message);
    } else if (error instanceof DataError) {
      console.log("Data Error", error);
    } else {
      console.error("Unknown Error:", error);
    }
  })
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
