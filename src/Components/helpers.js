//vlozit funkci na pocitani slevy 
export function discountCalculation(price, percentage){
  return  (price - (percentage * price / 100));
}
