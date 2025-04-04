(async () => {
  const {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    SystemProgram,
    clusterApiUrl,
  } = require("@solana/web3.js");

  const dotenv = require("dotenv");
  dotenv.config();

  let privateKey = process.env["PRIVATE_KEY"];
  if (!privateKey) {
    console.log("No secret key found! Add to .env");
    process.exit(1);
  }

  const asArray = Uint8Array.from(JSON.parse(privateKey));
  const sender = Keypair.fromSecretKey(asArray);

  const connection = new Connection(clusterApiUrl("devnet"));

  console.log(`Public key: ${sender.publicKey.toBase58()}`);

  const recipient = new PublicKey(
    "GP5nkMkXh4iLEz4BuNQh1RGMznq4cuy7ucq48b37ArAv"
  );
  console.log(`Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

  const transaction = new Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.01 * LAMPORTS_PER_SOL,
  });
  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
  ]);

  console.log("Transaction confirmed!", `\nSignature: ${signature}`);
})();
