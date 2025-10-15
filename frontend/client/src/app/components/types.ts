export type OrderItemForm = {
  foodId: string;
  quantity: string;
  price: string;
};

export type OrderItemPayload = {
  foodId: string;
  quantity: number;
  price: number;
};

export type OrderFormState = {
  customerId: string;
  restaurantId: string;
  items: OrderItemForm[];
  totalPrice: number;
  deliveryAddress: string;
};
