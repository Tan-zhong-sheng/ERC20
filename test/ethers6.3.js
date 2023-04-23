const {
  
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { getBigInt, toNumber, toBigInt, parseEther, formatEther,encodeBase64,toUtf8Bytes,decodeBase64,toUtf8String } = require("ethers");
const { ethers } = require("hardhat");

describe("ERC20Contract Test", async () => {
  async function deployOneYearLockFixture() {

    const [owner, otherAccount,testAccount] = await ethers.getSigners();

    const Erc20 = await ethers.getContractFactory("ERC20Coin");
    const erc20 = await Erc20.deploy(10000, 10000);
    await erc20.deployed()
    return { erc20, owner, otherAccount,testAccount };
  }
  describe("fun test", async () => {
    it("mint", async () => {
      const test = BigInt("1000")
      // console.log(test.toString())
      // console.log(getBigInt(test))
      // console.log(toNumber(1000))
      // console.log(toBigInt(1000))

      const ether = parseEther("1")
      console.log(ether)
      console.log(formatEther(ether))
      const a = encodeBase64(toUtf8Bytes("Hello World!!"))
      console.log(a)
      console.log(toUtf8String(decodeBase64(a)))
    
      
    })
    
  })
})