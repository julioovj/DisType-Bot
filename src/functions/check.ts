export function isHexColor(string: string) {
  const regExp = /^#([0-9A-F]{3}){1,2}$/i;
  return regExp.test(string);
}
