export function byte2hexStr(byte: number) {
  if (byte < 0 || byte > 255) throw new Error("Input must be a byte");

  const hexByteMap = "0123456789ABCDEF";

  let str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);

  return str;
}

export function bytesToString(arr: Array<number>) {
  let str = "";

  for (let i = 0; i < arr.length; i++) {
    const one = arr[i].toString(2);
    const v = one.match(/^1+?(?=0)/);

    if (v && one.length === 8) {
      const bytesLength = v[0].length;
      let store = arr[i].toString(2).slice(7 - bytesLength);

      for (let st = 1; st < bytesLength; st++)
        store += arr[st + i].toString(2).slice(2);

      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(arr[i]);
    }
  }

  return str;
}

export function hextoString(hex: string) {
  const arr = hex.replace(/^0x/, "").split("");
  let out = "";

  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = `0x${arr[i * 2]}${arr[i * 2 + 1]}`;
    out += String.fromCharCode(Number(tmp));
  }

  return out;
}

export function byteArray2hexStr(byteArray: Array<number>) {
  let str = "";

  for (let i = 0; i < byteArray.length; i++) str += byte2hexStr(byteArray[i]);

  return str;
}

// set strict as true: if the length of str is odd, add 0 before the str to make its length as even
export function hexStr2byteArray(str: string, strict = false) {
  let len = str.length;

  if (strict) {
    if (len % 2) {
      str = `0${str}`;
      len++;
    }
  }
  const byteArray = Array();
  let d = 0;
  let j = 0;
  let k = 0;

  for (let i = 0; i < len; i++) {
    const c = str.charAt(i);

    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;

      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    } else throw new Error("The passed hex char is not a valid hex string");
  }

  return byteArray;
}

export function isHexChar(c: string) {
  if (
    (c >= "A" && c <= "F") ||
    (c >= "a" && c <= "f") ||
    (c >= "0" && c <= "9")
  ) {
    return 1;
  }

  return 0;
}

export function hexChar2byte(c: string) {
  let d;

  if (c >= "A" && c <= "F") d = c.charCodeAt(0) - "A".charCodeAt(0) + 10;
  else if (c >= "a" && c <= "f") d = c.charCodeAt(0) - "a".charCodeAt(0) + 10;
  else if (c >= "0" && c <= "9") d = c.charCodeAt(0) - "0".charCodeAt(0);

  if (typeof d === "number") return d;
  else throw new Error("The passed hex char is not a valid hex char");
}
