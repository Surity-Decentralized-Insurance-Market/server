import {
  keccak256,
  sha256,
  toUtf8Bytes,
  toUtf8String,
  recoverAddress,
  SigningKey,
  AbiCoder,
  Signature,
  concat,
  id,
  Mnemonic,
  Wordlist,
  wordlists,
  Wallet as ethersWallet,
  HDNodeWallet as ethersHDNodeWallet,
  getBytes,
  computeHmac,
  BytesLike,
  SignatureLike,
  hashMessage,
} from "ethers";

const splitSignature = (sigBytes: SignatureLike) => Signature.from(sigBytes);
const joinSignature = (splitSig: SignatureLike) =>
  Signature.from(splitSig).serialized;
const arrayify = (value: BytesLike) => getBytes(value);
const FormatTypes = {
  sighash: "sighash",
  minimal: "minimal",
  full: "full",
  json: "json",
};
const isValidMnemonic = Mnemonic.isValidMnemonic;

computeHmac.register((algorithm, key, data) => {
  return computeHmac._(algorithm, Buffer.from(key), Buffer.from(data));
});

export {
  keccak256,
  sha256,
  toUtf8Bytes,
  toUtf8String,
  recoverAddress,
  SigningKey,
  Signature,
  AbiCoder,
  FormatTypes,
  splitSignature,
  joinSignature,
  arrayify,
  ethersWallet,
  ethersHDNodeWallet,
  concat,
  id,
  Mnemonic,
  Wordlist,
  wordlists,
  isValidMnemonic,
  hashMessage,
};
