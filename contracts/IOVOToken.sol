pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract IOVOToken is StandardToken {
    string public name = "IOVO Token"; 
    string public symbol = "IOVO";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 1000000000 * (10 ** decimals);

    function IOVOToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[tx.origin] = INITIAL_SUPPLY;
    }
}