pragma solidity ^0.5.0;

contract Vehicleshare {

    struct Vehicle {
        string make;
        string model;
        uint price;
        string location; // locating is converted from string to address using parseAddress string
        VehicleState state; // status of the vehicle. Has to be idle to hire vehicle
        bool registered;
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
        string start_date_time;
        string end_date_time;
        string location;
        uint cost;
    }

    event getVeh (
        address indexed _id,
        string _make,
        string _model,
        uint _price,
        string _location
    );
    
    event notifyOwner (
        uint indexed rentalId,
        address indexed driver,
        address owner,
        string start_date_time,
        string end_date_time
    );
    
    event notifyDriver (
        uint indexed rentalId,
        string make,
        string model,
        address owner,
        address driver
    );
    
    // Status of the vehicle 
    enum VehicleState { active, inactive, idle }

    // mapping to store the rentals
    mapping (uint => Rental) rentals;

    // mapping to store the vehicles
    mapping (address => Vehicle) public vehicles;
    
    // mapping to store the users
    mapping (address => User) users;
    
    // number of vehicles
    uint public numVehicles = 0;
    
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
        address owner,   // vehicle is the same as owner's key
        string memory start_date_time, 
        string memory end_date_time 
        // uint cost
    ) public payable  {
        rentalseq++;
        
        // address driver = msg.sender; 
        rentals[rentalseq] = Rental(msg.sender, owner, start_date_time, end_date_time, vehicles[owner].location, msg.value);
        emit notifyOwner(rentalseq, msg.sender, owner, start_date_time, end_date_time);
    }
    
    function getHire(uint rentalNo) public view returns (address, address, string memory, string memory, string memory, uint) {
        
        // address vehicle = rentals[rentalNo].vehicle;
        // Vehicle memory vehicleInfo = vehicles[vehicle]; // will this be needed?
        
        return (
            rentals[rentalNo].driver,
            rentals[rentalNo].vehicle, 
            rentals[rentalNo].start_date_time, 
            rentals[rentalNo].end_date_time,
            rentals[rentalNo].location,
            rentals[rentalNo].cost
            // vehicleInfo.price
        );
    }

    // register the vehicle onto the blockhain    
    function setVehicle(string memory make, string memory model, uint price, string memory location) public {
        numVehicles++; // Is this used?

        Vehicle storage vehicle = vehicles[msg.sender];
        
        vehicle.make = make;
        vehicle.model = model;
        vehicle.price = price;
        vehicle.location = location;
        vehicle.registered = true;

        emit getVeh(msg.sender, make, model, price, location);

        vehicleAccts.push(msg.sender);        
    }
    
    function getVehicle(address owner) public view returns (string memory, string memory, uint, string memory) {
        return (vehicles[owner].make, vehicles[owner].model, vehicles[owner].price, vehicles[owner].location);
    }

    function isRegistered(address owner) public view returns (bool) {
        return vehicles[owner].registered;
    }

    function vehicleList() public view returns(address[] memory) {
        return vehicleAccts;
    }
    
    function acceptDriver(address driver, uint rentalId) public {
        address owner = msg.sender;
        string memory make = vehicles[owner].make;
        string memory model = vehicles[owner].model;
        emit notifyDriver(rentalId, make, model, owner, driver);
        // driver.transfer(address(this).balance);
    }
    
    function confirmRequest(address payable owner) public {
        // rentals[rentalId].vehicle
        owner.transfer(address(this).balance);
    }

    function makePayment(address payable sendTo) public payable {
        sendTo.transfer(msg.value);
    }

    function cancelRequest() public payable {
        msg.sender.transfer(address(this).balance);
    }

    // function getBalance(address _user) public view returns (uint){
    //     return _user.balance;
    // }
    
    // function balanceOf() public view returns(uint) {
    //     return address(this).balance;
    // }

}