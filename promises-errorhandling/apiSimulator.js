export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}
export class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataError";
  }
}

export function fetchProductCatalog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        const products = [
          { id: 1, name: "Laptop", price: 1200 },
          { id: 2, name: "Headphones", price: 200 },
          { id: 3, name: "Refridgerator", price: 500 },
        ];
        resolve(products);
      } else {
        reject(new NetworkError("Failed to fetch product catalog"));
      }
    }, 1000);
  });
}

export function fetchProductReviews(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject(new DataError("Invalid product ID"));
        return;
      }

      if (Math.random() < 0.9) {
        const reviews = [
          { productId: 1, rating: 5, content: "It was a nice Laptop!" },
          { productId: 1, rating: 3, content: "Bad Laptop! Broke!" },
          { productId: 2, rating: 7, content: "Great Headphones!" },
          { productId: 2, rating: 5, content: "Good and working Headphones!" },
          { productId: 3, rating: 3, content: "Bad Refrigerator! Broke!" },
          { productId: 3, rating: 6, content: "Great Refrigerator!" },
        ].filter((item) => item.productId === id);

        resolve(reviews);
      } else {
        reject(
          new NetworkError(`Failed to fetch reviews for product ID ${id}`),
        );
      }
    }, 1500);
  });
}

export function fetchSalesReport() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        resolve({ totalSales: 25000, unitsSold: 50, averagePrice: 500 });
      } else {
        reject(new NetworkError("Failed to fetch sales report"));
      }
    }, 1000);
  });
}
