//Discount calculation
export function discountCalculation(price, percentage){
  return  (price - (percentage * price / 100));
}

//Text transform
export function textTransform(str) {
  return (
    str[0].toUpperCase() +
    str.slice(1).replace("-", " ").replace("ens", "en's")
  );
}