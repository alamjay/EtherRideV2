pragma solidity ^0.5.0;

contract Rideshare {

    struct Vehicle {
        string make;
        string model;
        uint price;
        string location; // locating is converted from string to address using parseAddress string
        VehicleState state; // status of the vehicle. Has to be idle to hire vehicle
    }
    
    struct User {
        string fName;
        string lName;
        string licenceNo;
        string dob;
    }

    struct Rental {
        address driver;
        address vehicle;
        uint start_date;
        uint end_date;
        uint start_time;
        uint end_time;
    }
    
    // Status of the vehicle 
    enum VehicleState { active, inactive, idle }

    // mapping to store the rentals
    mapping (uint => Rental) rentals;

    // mapping to store the vehicles
    mapping (address => Vehicle) vehicles;
    
    // mapping to store the users
    mapping (address => User) users;
    
    // sequence number of rentals
    uint rentalseq;
    
    // number of owners with listing of vehicles
    address[] public vehicleAccts;
    
    // Register the user
    function setUser(
        address addr, 
        string memory fName, 
        string memory lName, 
        string memory licenceNo, 
        string memory dob
    ) public {
        users[addr] = User(fName, lName, licenceNo, dob);
    }
    
    function getUser (address addr) public view returns (address, string memory, string memory, string memory, string memory) {
        return (addr, users[addr].fName, users[addr].lName, users[addr].licenceNo, users[addr].dob);
    }

    // hire a vehicle
    function setHire(
        address driver,
        address vehicle,   // vehicle is the same as owner's key
        uint start_date, 
        uint end_date, 
        uint start_time, 
        uint end_time
    ) public payable  {
        rentalseq++;

        rentals[rentalseq] = Rental(driver, vehicle, start_date, end_date, start_time, end_time);
    }
    
    function getHire(uint rentalNo) public view returns (address, address, uint, uint, uint, string memory) {
        
        address vehicle = rentals[rentalNo].vehicle;
        Vehicle memory vehicleInfo = vehicles[vehicle];
        
        return ( 
            rentals[rentalNo].driver,
            rentals[rentalNo].vehicle, 
            rentals[rentalNo].start_date, 
            rentals[rentalNo].end_date,
            vehicleInfo.price,
            vehicleInfo.location
        );
    }

    // register the vehicle onto the blockhain    
    function setVehicle(address owner, string memory make, string memory model, uint price, string memory location) public {
        Vehicle storage vehicle = vehicles[owner];
        
        vehicle.make = make;
        vehicle.model = model;
        vehicle.price = price;
        vehicle.location = location;
        
        vehicleAccts.push(owner) -1;
    }
    
    function getVehicle(address owner) public view returns (string memory, string memory, uint, string memory) {
        return (vehicles[owner].make, vehicles[owner].model, vehicles[owner].price, vehicles[owner].location);
    }
    

}