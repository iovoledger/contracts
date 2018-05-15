pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol';

contract IOVOTokenLimitedPrivate is AllowanceCrowdsale {
    using SafeMath for uint256;

    uint256 tokenSold;

    uint constant E6 = 10**6;
    uint constant E18 = 10**18; // Decimals

    uint256 public constant TIER1_DISCOUT      = 70;
    uint256 public constant TIER2_DISCOUT      = 55;
    uint256 public constant TIER1_TOTAL_SUPPLY = 125 * E6 * E18;
    uint256 public constant TIER2_TOTAL_SUPPLY = 125 * E6 * E18;

    function IOVOTokenLimitedPrivate(address _tokenWallet, uint256 _rate, address _wallet, ERC20 _token) AllowanceCrowdsale(_tokenWallet) Crowdsale(_rate, _wallet, _token) public {
    }

    /**
    * @dev Overrides parent method to saving tokenSold amount.
    * @param _beneficiary Address receiving the tokens
    * @param _tokenAmount Number of tokens to be purchased
    */
    function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal {
        tokenSold = tokenSold.add(_tokenAmount);

        _deliverTokens(_beneficiary, _tokenAmount);
    }

    /**
   * @dev Overrides parent method taking into account token sold amount and discounts.
   * @param _weiAmount The value in wei to be converted into tokens
   * @return The number of tokens _weiAmount wei will buy at present time
   */
  function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
      
    uint256 tier1Rate = rate.mul(100) / (100 - TIER1_DISCOUT);
    uint256 tier1TokenAmount = tier1Rate.mul(_weiAmount);

    uint256 remainingWei = max(tokenSold + tier1TokenAmount - TIER1_TOTAL_SUPPLY, 0) / tier1Rate;
    
    uint256 tier2Rate = rate.mul(100) / (100 - TIER2_DISCOUT);
    uint256 tier2TokenAmount = tier2Rate.mul(remainingWei);

    return tier1TokenAmount + tier2TokenAmount;
  }

  function max(uint256 a, uint256 b) private pure returns (uint256) {
    return a > b ? a : b;
  }
}