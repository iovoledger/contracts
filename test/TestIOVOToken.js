var IOVOToken = artifacts.require("./IOVOToken.sol");

contract('IOVOToken', function(accounts) {
  it("should put 1,000,000,000 IOVOToken in the first account", async function() {
    var iovo = await IOVOToken.deployed()
    var balance = await iovo.balanceOf.call(accounts[0]);

    assert.equal(balance.valueOf(), 1e9 * 1e18, "1,000,000,000 wasn't in the first account");
  });
  it("should transfer IOVOToken correctly", function() {
    var iovo;

    // Get initial balances of first and second account.
    var accountSender = accounts[0];
    var accountReceiver = accounts[1];

    var accountSenderStartingBalance;
    var accountReceiverStartingBalance;
    var accountSenderEndingBalance;
    var accountReceiverEndingBalance;

    var amount = 10;

    return IOVOToken.deployed().then(function(instance) {
      iovo = instance;
      return iovo.balanceOf.call(accountSender);
    }).then(function(balance) {
      accountSenderStartingBalance = balance.toNumber();
      return iovo.balanceOf.call(accountReceiver);
    }).then(function(balance) {
      accountReceiverStartingBalance = balance.toNumber();
      return iovo.transfer(accountReceiver, amount, {from: accountSender});
    }).then(function() {
      return iovo.balanceOf.call(accountSender);
    }).then(function(balance) {
      accountSenderEndingBalance = balance.toNumber();
      return iovo.balanceOf.call(accountReceiver);
    }).then(function(balance) {
      accountReceiverEndingBalance = balance.toNumber();

      assert.equal(accountSenderEndingBalance, accountSenderStartingBalance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(accountReceiverEndingBalance, accountReceiverStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
