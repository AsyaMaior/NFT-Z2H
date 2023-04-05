require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   defaultNetwork: "hardhat",
//   solidity: "0.8.18",
// };

const TBNB_PRIVATE_KEY = process.env.TBNB_PRIVATE_KEY;
const TBNB_RPC_URL = process.env.TBNB_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    //здесь указываем все сети, с которыми будем работать
    bnbtestnet: {
      url: TBNB_RPC_URL, //RPC from my quicknode
      accounts: [TBNB_PRIVATE_KEY],
      chainId: 97,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY, // My Etherscan API key
  },
  gasReporter: {
    enabled: true,
    outputFile: "gasreporter.txt",
    noColors: true,
  },
};
