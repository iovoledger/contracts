const IOVOToken = artifacts.require('./IOVOToken.sol');

module.exports = function(deployer, network, accounts) {

    return deployer
        .then(() => {
            return deployer.deploy(IOVOToken);
        });
};