export function generateRandomHex(length: number): string {
  const characters = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function isFunction(obj: any) {
  return typeof obj === "function";
}
