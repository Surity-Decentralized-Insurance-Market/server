import { hexStr2byteArray } from "./bytes";
import { getBase58CheckAddress } from "./crypto";
import { recoverAddress, hashMessage } from "./ethersUtils";

//@ts-ignore
import TronWeb from "tronweb";

export const ADDRESS_SIZE = 34;
export const ADDRESS_PREFIX = "41";
export const ADDRESS_PREFIX_BYTE = 0x41;
export const ADDRESS_PREFIX_REGEX = /^(41)/;

export const TRON_BIP39_PATH_PREFIX = "m/44'/195'";
export const TRON_BIP39_PATH_INDEX_0 = TRON_BIP39_PATH_PREFIX + "/0'/0/0";

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

export function verifyMessageV2(message: string, signature: string): string {
  return TronWeb.Trx.verifyMessageV2(message, signature);
}
