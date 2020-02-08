var Synapse = artifacts.require("./synapse.sol");

var Profile = artifacts.require("./profile.sol");

module.exports = function(deployer) {
  deployer.deploy(Synapse);
  deployer.deploy(Profile);
};
