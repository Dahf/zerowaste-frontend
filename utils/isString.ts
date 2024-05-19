export default function isString(x: any): x is String {
  return typeof x === 'string';
}
