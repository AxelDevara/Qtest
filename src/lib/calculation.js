export const discountCalculations = (carts = []) => {
  let totalMetalQty = 0;
  let totalPvcQty = 0;
  let totalTapQty = 0;

  let totalMetalPrice = 0;
  let totalPvcPrice = 0;
  let totalTapPrice = 0;
  let totalAllPrice = 0;

  // default discount 0, kalau ada discount, mengganti value di database item mana yang diberi discount atau semuanya diberi discount
  let metalDisc = 0;
  let pvcDisc = 0;
  let tapDisc = 0;
  let affiliateDisc = 0;

  let discount = 30;
  let disc = true;
  let refDisc = true;

  let totalDisc = 0;
  let totalRefDisc = 0;

  let ongkir = 8000;

  carts.map((cart) => {
    if (cart.type === 'METAL') {
      totalMetalQty += cart.qty;
      totalMetalPrice += cart.product.price * cart.qty;
      // discount !== 0 ? (metalDisc = discount) : (metalDisc = 0);
    }
    if (cart.type === 'PVC') {
      totalPvcQty += cart.qty;
      totalPvcPrice += cart.product.price * cart.qty;
      // discount !== 0 ? (pvcDisc = discount) : (pvcDisc = 0);
    }
    if (cart.type === 'QUBICTAP') {
      totalTapQty += cart.qty;
      totalTapPrice += cart.product.price * cart.qty;
      // discount !== 0 ? (tapDisc = discount) : (tapDisc = 0);
    }
  });

  if (metalDisc !== 0 || pvcDisc !== 0 || tapDisc !== 0) {
    totalAllPrice =
      totalMetalPrice -
      (totalMetalPrice * metalDisc) / 100 +
      totalPvcPrice -
      (totalPvcPrice * pvcDisc) / 100 +
      totalTapPrice -
      (totalTapPrice * tapDisc) / 100;

    if (affiliateDisc !== 0) {
      totalRefDisc = (totalAllPrice * affiliateDisc) / 100;
      totalAllPrice = totalAllPrice - totalRefDisc;
    }
  } else {
    totalAllPrice = totalMetalPrice + totalPvcPrice + totalTapPrice;

    if (affiliateDisc !== 0) {
      totalRefDisc = (totalAllPrice * affiliateDisc) / 100;
      totalAllPrice = totalAllPrice - totalRefDisc;
    }
  }

  totalDisc = metalDisc + pvcDisc + tapDisc;
  totalAllPrice += ongkir;
};
