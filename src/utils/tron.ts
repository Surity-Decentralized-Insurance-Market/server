import { hexStr2byteArray } from "./bytes";
import { getBase58CheckAddress } from "./crypto";
import { recoverAddress, hashMessage } from "./ethersUtils";

export const ADDRESS_PREFIX = "41";

export function verifyMessage(message: string, signature: string) {
  if (!signature.match(/^0x/)) {
    signature = "0x" + signature;
  }
  const recovered = recoverAddress(hashMessage(message), signature);
  const base58Address = getBase58CheckAddress(
    hexStr2byteArray(recovered.replace(/^0x/, ADDRESS_PREFIX))
  );

  return base58Address;
}
