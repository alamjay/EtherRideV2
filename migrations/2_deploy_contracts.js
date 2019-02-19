const MyStringStore = artifacts.require("MyStringStore");
const Vehicleshare = artifacts.require("Vehicleshare");

module.exports = function(deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Vehicleshare);
};