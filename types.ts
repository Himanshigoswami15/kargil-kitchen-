export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[]; // e.g., 'GF', 'V', 'Spicy'
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface PairingResponse {
  wine: string;
  description: string;
}