const MyStringStore = artifacts.require("MyStringStore");
const Rideshare = artifacts.require("Rideshare");

module.exports = function(deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Rideshare);
};