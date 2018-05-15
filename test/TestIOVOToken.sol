pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IOVOToken.sol";

contract TestIOVOToken {

  uint public decimals = 18;

  function testInitialBalanceUsingDeployedContract() public {
    IOVOToken meta = IOVOToken(DeployedAddresses.IOVOToken());

    uint expected = 1000000000 * (10 ** decimals);

    Assert.equal(meta.balanceOf(tx.origin), expected, "Owner should have 1,000,000,000 IOVOToken initially");
  }

  function testInitialBalanceWithNewIOVOToken() public {
    IOVOToken meta = new IOVOToken();

    uint expected = 1000000000 * (10 ** decimals);

    Assert.equal(meta.balanceOf(tx.origin), expected, "Owner should have 1,000,000,000 IOVOToken initially");
  }

}
