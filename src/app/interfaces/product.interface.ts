export interface IProduct {
  _id: string;
  name: string;
  description: string;
  sku: string;
  image: string;
  price: number;
  stock: number;
  tags: string[];
  priceHistory: { price: number, date: Date }[];
  stockHistory: { stock: number, date: Date }[];
}
