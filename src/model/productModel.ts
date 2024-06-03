export type ProductRequestId = number;

export type CreateProductRequest = {
  file: any;
  sku: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  categoryId: number | null;
};

export type CreateProductResponse = {
  id: number;
  sku: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
  category: {
    id: number;
    name: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};
