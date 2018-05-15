var IOVOToken = artifacts.require("./IOVOToken.sol");
var IOVOTokenPrivate = artifacts.require("./IOVOTokenPrivate.sol");

contract('IOVOTokenPrivate', function(accounts) {
    it("Buy tokens", async function() {
    
    var buyerAccount = accounts[5];
    
    var iovo = await IOVOToken.deployed();
    var iovoPrivate = await IOVOTokenPrivate.deployed();
    var walletAddress = await iovoPrivate.wallet.call();
    var tokenWallet = await iovoPrivate.tokenWallet.call();
    var rate = await iovoPrivate.rate.call();

    assert(tokenWallet, accounts[0], "TokenWallet should equal first addres");

    var iovoBalanceBefore = await iovo.balanceOf.call(tokenWallet);
    var buyerIOVOBalanceBeforeTransaction = await iovo.balanceOf.call(buyerAccount);
    var walletBalanceStart = web3.eth.getBalance(walletAddress).toNumber();

    var amount = 1e+18;
    try {
      await iovoPrivate.sendTransaction({ value: amount, from: buyerAccount });
    } catch (error) {
      assert.fail("Error" + error);
    }

    var iovoBalanceAfter = await iovo.balanceOf.call(tokenWallet);
    var buyerIOVOBalanceAfterTransaction = await iovo.balanceOf.call(buyerAccount);
    var walletBalanceEnd = web3.eth.getBalance(walletAddress).toNumber();

    assert.equal(web3.eth.getBalance(IOVOTokenPrivate.address).toNumber(), 0, "Should be no balance on contract");
    assert.equal(iovoBalanceAfter, iovoBalanceBefore - rate*amount, "Token wallet should decrease balance");
    assert.equal(walletBalanceEnd, walletBalanceStart + amount, "All founds should be on wallet");
    assert.equal(buyerIOVOBalanceAfterTransaction.toNumber(), buyerIOVOBalanceBeforeTransaction + rate*amount, "User should receive IOVO tokens");
  });
});
