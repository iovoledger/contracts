const IOVOToken = artifacts.require('./IOVOToken.sol');
const IOVOTokenPrivate = artifacts.require('./IOVOTokenPrivate.sol');

module.exports = function(deployer, network, accounts) {
    const rate = new web3.BigNumber(1832);
    const allowance = new web3.BigNumber(2000 * 1e18);

    const tokenWallet = accounts[0]
    const wallet = accounts[1]

    return deployer
        .then(async function() {
            console.log("IOVOToken address: " + IOVOToken.address);

            var start = (new Date()).getTime() / 1000;
            console.log("Start (2018-04-01): " + start);

            var end = (new Date("2018-05-30")).getTime() / 1000;
            console.log("End (2018-04-30): " + end);

            var iovoPrivate = await deployer.deploy(
                IOVOTokenPrivate,
                tokenWallet,
                start,
                end,
                rate,
                wallet,
                IOVOToken.address
            );

            var iovo = await IOVOToken.deployed();

            await iovo.approve(IOVOTokenPrivate.address, allowance, {from:tokenWallet});
        });
};