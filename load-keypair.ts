import { Keypair } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

let privateKey = process.env["PRIVATE_KEY"];
if (!privateKey) {
  console.log("No secret key found! Add to .env");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public key: ${keypair.publicKey.toBase58()}`);
