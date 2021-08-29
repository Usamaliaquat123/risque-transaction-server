var StellarBase = require("stellar-base");
var StellarSdk = require("stellar-sdk");

var keypair = StellarBase.Keypair.fromSecret(
  "SCU36VV2OYTUMDSSU4EIVX4UUHY3XC7N44VL4IJ26IOG6HVNC7DY5UJO",
);
var account = new StellarBase.Account(keypair.publicKey(), "713226564141056");


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