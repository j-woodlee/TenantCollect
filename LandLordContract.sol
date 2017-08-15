pragma solidity ^0.4.0;
contract LandLordContract {

    struct Tenant {
        bytes32 name;   // short name (up to 32 bytes)
        uint totalOwed;
        uint paidSoFar;
    }

    mapping(address => Tenant) tenants;
    address landlord;
    uint totalRentPrice;

    event LogPaymentMade(address accountAddress, uint amount);

    function LandLordContract(uint totalPrice) {
        landlord = msg.sender;
        totalRentPrice = totalPrice;
    }

    function addTenant(address t, bytes32 nameToAdd, uint owed, uint paid) {
        tenants[t] = Tenant({
            name: nameToAdd,
            totalOwed: owed,
            paidSoFar: paid
        });
    }

    function pay() public payable returns (uint) {
        tenants[msg.sender].paidSoFar += msg.value;
        LogPaymentMade(msg.sender, msg.value);
        return tenants[msg.sender].totalOwed - tenants[msg.sender].paidSoFar;
    }
}
