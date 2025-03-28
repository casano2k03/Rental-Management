export interface ProductImage {
    id: number;
    image_url: string | null;
    image: string;
    is_main: boolean;
    caption: string;
    upload_date: string;
    product: number;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price_per_day: number;
    stock: number;
    category: string;
    gender: string;
    size: string | null;
    color: string | null;
    images: ProductImage[];
    created_at: string;
    updated_at: string;
  }
  