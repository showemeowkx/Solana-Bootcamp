(async () => {
  const dotenv = require("dotenv");
  dotenv.config();
  const {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
  } = require("@solana/web3.js");

  const connection = new Connection(clusterApiUrl("devnet"));
  console.log("Connected to devnet!");

  const publicKey = new PublicKey(
    "Gxu6sTPutrry9PdBixkdGmhXwzrKG1neXBcD8wUH9EE5"
  );

  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `The balance of the wallet at address ${publicKey} is ${balanceInSOL}`
  );
})();
