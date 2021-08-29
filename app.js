const express = require('express');
const fetch = require("node-fetch");

const StellarSdk = require("stellar-sdk")
var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
// initialize express server 
const app = express();


const pair = StellarSdk.Keypair.random();




var sourceKeys = StellarSdk.Keypair.fromSecret(
    "SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4",
  );
var destinationId = "GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5";
var transaction;



server.loadAccount(destinationId).then(() => {
    return server.loadAccount(sourceKeys.publicKey());
}).then((sourceAccount) => {
    transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
})



// Port which server is running on 
var port = process.env.PORT || 8080;



// Secret token
var secretToken = pair.secret();
// Public Token
var publicToken = pair.publicKey()


// lumen horizon server


const main = async () => {
    try {
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${encodeURIComponent(
                publicToken,
            )}`,
          );
          const responseJSON = await response.json();
          console.log("SUCCESS! You have a new account :)\n", responseJSON);



// the JS SDK uses promises for most actions, such as retrieving an account
const account = await server.loadAccount(pair.publicKey());
console.log("Balances for account: " + pair.publicKey());
account.balances.forEach(function (balance) {
  console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
});


    }catch(err) { console.error(`ERROR ${err}`) }
} 


main()


// var server = new StellarSdk.Server('https://horizon-testnet.stellar.org')



console.log(secretToken)
console.log(publicToken)












app.listen(port, () => {
    console.log(`port is running on ${port}`)
})
