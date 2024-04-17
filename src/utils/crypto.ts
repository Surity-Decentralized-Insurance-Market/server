import { encode58 } from "./base58";
import { byteArray2hexStr, hexStr2byteArray } from "./bytes";
import { sha256 } from "./ethersUtils";

export function getBase58CheckAddress(addressBytes: number[]) {
  const hash0 = SHA256(addressBytes);
  const hash1 = SHA256(hash0);

  let checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);

  return encode58(checkSum);
}

export function SHA256(msgBytes: number[]) {
  const msgHex = byteArray2hexStr(msgBytes);
  const hashHex = sha256("0x" + msgHex).replace(/^0x/, "");
  return hexStr2byteArray(hashHex);
}
