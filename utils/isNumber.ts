export default function isNumber(x: any): x is Number {
  return typeof x === 'number' && !isNaN(x);
}
