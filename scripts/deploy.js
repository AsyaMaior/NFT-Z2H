const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("NFTCollection");
  const token = await Token.deploy();
  await token.deployed();

  console.log(`owner address: ${owner.address}`);

  console.log(`Deployed token address: ${token.address}`);

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await token.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  console.log(`Contract deployed to ${token.address} on ${network.name}`);

  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: token.address,
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
