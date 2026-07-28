export type ChamberCode = "D1" | "D2" | "D3" | "D4" | "E1" | "E2" | "E3" | "E4";

export interface Product {
  id: string;
  name: string;
  code: string;
  tare: number;
  chamber: ChamberCode;
  imageUrl?: string;
}

export type ProductInput = Omit<Product, "id">;
