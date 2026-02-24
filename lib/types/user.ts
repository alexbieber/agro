export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  state?: string;
  district?: string;
  landSize?: number;
  cropsGrown?: string[];
  isDistributor?: boolean;
  distributorId?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  district: string;
  address1: string;
  address2?: string;
  type: "home" | "farm";
  isDefault: boolean;
}
