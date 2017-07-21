// var ConvertLib = artifacts.require("./ConvertLib.sol");
var Guess = artifacts.require("./Guess.sol");

// We don't deploy MetaCoin so that Guess can own MetaCoin.
module.exports = function(deployer) {
  deployer.deploy(Guess);
};
