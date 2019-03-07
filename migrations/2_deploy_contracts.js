const Vehicleshare = artifacts.require("Vehicleshare");

module.exports = function(deployer) {
  deployer.deploy(Vehicleshare);
};