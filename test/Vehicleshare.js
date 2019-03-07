// const Vehicleshare = artifacts.require("./Vehicleshare.sol");


// contract("Vehicleshare", function(acocunts){
//     it("Should register a vehicle", function() {
//         // return Vehicleshare.deployed().then(function(instance){
//         //     make = "BMW";
//         //     model = "3 Series";
//         //     price = 1;
//         //     location = "London"
//         //     return instance.setVehicle(make, model, price, location, {from: accounts[0]});
//         // }).then(function(){
//         //     return console.log(instance.getVehicle("0xf52699a790e8130170a2c8f9080cb42e11a1a75c"));
//         // })

//         return Vehicleshare.numVehicles().then(function(res){
//             assert.equal(res, 0);
//         });
//     });
// });

const Vehicleshare = artifacts.require("Vehicleshare");

contract('Vehicleshare', (accounts) => {

    // Owner should be able to register the vehicle onto the platform
    it('should register the vehicle', function(){
        Vehicleshare.deployed()
          .then((instance) => {
              instance.setVehicle("BMW", "M3", 1, "London", {from: accounts[0]});
            return instance.vehicles.call(accounts[0]);
          }).then((getVeh) => {
            assert.equal(getVeh.make, "BMW", "They don't match");
            assert.equal(getVeh.model, "M3", "They don't match");
            assert.equal(getVeh.price, 1, "They don't match");
            assert.equal(getVeh.location, "London", "They don't match");
          })
      });

      it('should reserve a vehicle', function(){
          Vehicleshare.deployed()
          .then((instance => {
            instance.setVehicle("BMW", "M3", 1, "London", {from: accounts[0]});
              instance.setHire(accounts[0], "07032018T11:30", "07032018T12:30", {from: accounts[1]});
              return instance.rentals.call(1);
          }))
          .then((getRental) => {
              assert.equal(getRental.driver, accounts[1]);
              assert.equal(getRental.vehicle, accounts[0]);
              assert.equal(getRental.start_date_time, "07032018T11:30");
              assert.equal(getRental.end_date_time, "07032018T12:30");
              assert.equal(getRental.location, "London");
          })
      })
});