const hre = require("hardhat");
const { assert, expect } = require("chai");

describe("NFTCollection", function () {
  let Token, token;
  let owner;
  let acc1;
  let acc2;
  beforeEach(async function () {
    [owner, acc1, acc2] = await ethers.getSigners();
    Token = await hre.ethers.getContractFactory("NFTCollection");
    token = await Token.deploy();
    await token.deployed();
  });

  it("should be deployed", async function () {
    expect(token.address).to.be.properAddress;
  });

  it("Should revert if value has less than 0.001 tBNB", async function () {
    await token.activeMint();
    await expect(
      token.mint({
        value: ethers.utils.parseEther("0.0001"),
      })
    ).to.be.revertedWith("You pay incorrect amount of money. Pay 0.001 tBNB");
  });

  it("should we pay the value", async function () {
    await token.activeMint();
    const tx = token.connect(acc2).mint({
      value: ethers.utils.parseEther("0.001"),
    });

    await expect(() => tx).to.changeEtherBalance(
      acc2,
      -ethers.utils.parseEther("0.001")
    );
  });
});
