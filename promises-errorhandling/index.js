import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  NetworkError,
  DataError,
} from "./apiSimulator.js";

fetchProductCatalog() // returns a promise object
  .then((productCatalog) => {
    console.log("Products :");
    console.log(productCatalog);

    // Create an array of promises for all product reviews
    const reviewPromises = productCatalog.map((product) =>
      fetchProductReviews(product.id).then((reviews) => {
        console.log(`Reviews for Product ${product.id}:`);
        console.log(reviews);
        return reviews; // return reviews if needed later
      }),
    );

    // Wait for all review fetches to complete
    return Promise.all(reviewPromises);
  })
  .then(() => {
    // Fetch sales report after all reviews are done
    return fetchSalesReport();
  })

  // fetch reviews for single product

  //   return fetchProductReviews(productCatalog[1].id); // returns a promise object
  // })

  // .then((productReviews) => {
  //   console.log("Reviews for Product " + productReviews[0].productId + ":");
  //   console.log(productReviews);
  //   return fetchSalesReport(); // returns a promise object
  // })

  .then((salesReport) => {
    console.log("Sales Report:");
    console.log(salesReport);
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
