export default () => ({
  port: process.env.PORT,
  web3Url: process.env.WEB3_URL,
  web3StorageToken: process.env.WEB3_STORAGE_TOKEN,
  smartContractAddress: process.env.SMART_CONTRACT_ADDRESS,
  abi: process.env.ABI,
  cryptoKey: process.env.CRYPTO_KEY
});

