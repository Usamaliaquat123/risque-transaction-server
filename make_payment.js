var StellarBase = require("stellar-base");
var StellarSdk = require("stellar-sdk");

var keypair = StellarBase.Keypair.fromSecret(
  "SDIHJGX2QSISSMZXJWWMLQCM7NCAP7PHVH6NTKCPRF42CGSSYB7XQWZL",
);
var account = new StellarBase.Account(keypair.publicKey(), "2341126543507544");


// Amount
var amount = "100";
var transaction = new StellarSdk.TransactionBuilder(account, {
    networkPassphrase: StellarBase.Networks.TESTNET,
    fee: StellarSdk.BASE_FEE,
  })
  .addOperation(
    StellarBase.Operation.createAccount({
      destination: StellarBase.Keypair.random().publicKey(),
      startingBalance: amount,
    }),
  )
  .setTimeout(180)
  .build();

transaction.sign(keypair);

console.log(transaction.toEnvelope().toXDR().toString("base64"));