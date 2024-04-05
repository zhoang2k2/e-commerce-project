export interface Product {
  id: number;
  name: string;
  price: string;
  quantity: string;
  image: string;
  manufacturer: string;
  category: string;
  status: string;
}

export interface ProductState {
  products: Product[];
}
