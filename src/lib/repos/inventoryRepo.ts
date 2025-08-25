const stock = new Map<number, number>(); 

stock.set(122, 10);

export const InventoryRepo = {
  hasStock(productId:number, needed:number){ return (stock.get(productId) ?? 0) >= needed; },
  reserve(productId:number, qty:number){ 
    const cur = stock.get(productId) ?? 0;
    if (cur < qty) return false;
    stock.set(productId, cur - qty);
    return true;
  },
  assign(_productId:number, _qty:number){ return true; }
};
