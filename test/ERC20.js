const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

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
      const { erc20, owner, otherAccount,testAccount } = await loadFixture(deployOneYearLockFixture);

      // await erc20.connect(otherAccount).mint(otherAccount.address,{
      //   value:10000
      // })
      
      await erc20.connect(owner).mint(otherAccount.address,{
        value:10000
      })
      console.log(await erc20.totalSupply())
      console.log(await erc20.balanceOf(otherAccount.address))
      console.log(await erc20.balanceOf(owner.address))
      await erc20.transfer(otherAccount.address,500)
      console.log(await erc20.balanceOf(otherAccount.address))
      console.log(await erc20.balanceOf(owner.address))
      //otherAccount授权owner 拥有20000
      await erc20.connect(otherAccount).approve(owner.address,20000)
      console.log("own掌握多少代币",await erc20.allowance(otherAccount.address,owner.address))
      // await erc20.transferFrom(otherAccount.address,testAccount.address,10000)
      // console.log(await erc20.balanceOf(otherAccount.address))
      // console.log("own掌握多少代币",await erc20.allowance(otherAccount.address,owner.address))
      // await erc20.transferFrom(otherAccount.address,testAccount.address,10000)
    })
    
  })
})