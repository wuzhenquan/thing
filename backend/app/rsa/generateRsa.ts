const NodeRSA = require('node-rsa')
const fs = require('fs')

function generateRsa() {
  var key = new NodeRSA({ b: 512 }) // Generate new 512bit-length key
  
  key.setOptions({ encryptionScheme: 'pkcs1' })

  var privatePem = key.exportKey('pkcs1-private-pem')
  var publicPem = key.exportKey('pkcs8-public-pem')
  
  fs.writeFile(`${__dirname}/public.pem`, publicPem, err => {
    if (err) throw err
    console.log('public key saved')
  })
  fs.writeFile(`${__dirname}/private.pem`, privatePem, err => {
    if (err) throw err
    console.log('private key saved')
  })
}

module.exports = generateRsa
