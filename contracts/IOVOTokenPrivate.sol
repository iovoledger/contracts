pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';

contract IOVOTokenPrivate is AllowanceCrowdsale, TimedCrowdsale {
    function IOVOTokenPrivate(address _tokenWallet,
                              uint256 _openingTime,
                              uint256 _closingTime,
                              uint256 _rate,
                              address _wallet,
                              ERC20 _token) public
                              AllowanceCrowdsale(_tokenWallet)
                              TimedCrowdsale(_openingTime, _closingTime)
                              Crowdsale(_rate, _wallet, _token)
    {
    }
}