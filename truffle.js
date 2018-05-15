module.exports = {
  networks: {
    rinkeby: {
      network_id: 4,
      host: "localhost",
      port: 8547   // Different than the default below
    },
    live: {
          network_id: 1,
          port: 8546,
          host: "localhost",
          gasPrice: 10000000000,
          gas: 700000
    },
    development: {
        host: "localhost",
        port: 7545,
        network_id: "*" // Match any network id
    }
  },
	rpc: {
		host: "localhost",
		gas: 6721975,
		port: 7545
	},
  solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	},
};
