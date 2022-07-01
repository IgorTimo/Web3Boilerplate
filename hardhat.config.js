require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    [process.env.NETWORK]: {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
