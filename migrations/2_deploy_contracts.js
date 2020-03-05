var Synapse = artifacts.require("./synapse.sol");
var Profile = artifacts.require("./profile.sol");
var Bio = artifacts.require("./bio.sol");

module.exports = function(deployer) {
  deployer.deploy(Synapse);
  deployer.deploy(Profile);
  deployer.deploy(Bio);
};
