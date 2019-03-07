const Vehicleshare = artifacts.require("./Vehicleshare");

contract("Vehicleshare", accounts => {
  it("should register the vehicle", async () => {
    const vehicleshare = await Vehicleshare.deployed();

    // Owner should be able to register the vehicle onto the platform
    await vehicleshare.setVehicle("BMW", "M3", 1, "London", {from: accounts[0]});

    // get vehicle from public vehices variable
    const getVehicle = await vehicleshare.vehicles.call(accounts[0]);

    assert.equal(getVehicle.make, "BMW", "The vehicle make don't match");
    assert.equal(getVehicle.model, "M3", "The vehicle model don't match");
    assert.equal(getVehicle.price, 1, "The price don't match");
    assert.equal(getVehicle.location, "London", "The location don't match");

  });

  it("should reserve a vehicle", async () => {
    const vehicleshare = await Vehicleshare.deployed();
    await vehicleshare.setHire(accounts[0], "07032018T11:30", "07032018T12:30", {from: accounts[1], value: 1000000000000000000});
    const getHire = await vehicleshare.rentals.call(1);
    
    assert.equal(getHire.driver, accounts[1], "The accounts don't match");
    assert.equal(getHire.vehicle, accounts[0], "The accounts don't match");
    assert.equal(getHire.start_date_time, "07032018T11:30", "The times don't match");
    assert.equal(getHire.end_date_time, "07032018T12:30", "The times don't match");
    assert.equal(getHire.location, "London", "The location don't match");
  });

  it("should notify the owner when driver reserves vehicle", async () => {
    const vehicleshare = await Vehicleshare.deployed();
    const getOwnerRequest = await vehicleshare.acceptDriver.call(accounts[1], 1, {from: accounts[0]});
    assert.equal(getOwnerRequest, true, "No results from acceptDriver method");
  });

  it("should transfer funds from contract to owner", async () => {
    const vehicleshare = await Vehicleshare.deployed();
    const getConfirmRequest = await vehicleshare.confirmRequest(accounts[0], {from: accounts[1]});
    assert.equal(getConfirmRequest.receipt.gasUsed, 30966, "The gasUsed don't match");
  });
});