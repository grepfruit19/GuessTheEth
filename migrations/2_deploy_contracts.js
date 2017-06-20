// var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Guess = artifacts.require("./Guess.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  // deployer.link(MetaCoin, Guess);
  deployer.deploy(Guess);
  deployer.deploy(MetaCoin);
};
