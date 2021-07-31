export type priceInfo = {
  price: number,
  quantity: number,
  discountPercent: number,
  typeDiscountPercent: number,
};

export interface idVsPriceInfo {
  [id: number]: priceInfo;
}

export interface billInfo {
  totalItems: number;
  totalBill: number;
  discountAmount: number;
  typeDiscountAmount: number;
}
