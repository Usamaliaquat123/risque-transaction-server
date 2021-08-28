const express = require('express');

const StellarSdk = require("stellar-sdk")

const pair = StellarSdk.Keypair.random();
// initialize express server 
const app = express();


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
    }catch(err) { console.error(`ERROR ${err}`) }
} 


main()

// var server = new StellarSdk.Server('https://horizon-testnet.stellar.org')



console.log(secretToken)
console.log(publicToken)












app.listen(port, () => {
    console.log(`port is running on ${port}`)
})
