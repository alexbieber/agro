export type OrderStatus = "confirmed" | "dispatched" | "delivered" | "cancelled";

export interface Order {
  id: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  customerName: string;
  phone: string;
  state: string;
  amount: number;
  status: OrderStatus;
  date: string;
  paymentStatus: "pending" | "paid" | "failed";
}
