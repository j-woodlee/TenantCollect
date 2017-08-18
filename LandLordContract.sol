pragma solidity ^0.4.0;
contract LandLordContract {

    struct Tenant {
        bytes32 name;   // short name (up to 32 bytes)
        uint totalOwed;
        uint paidSoFar;
        bool hasVal; // default value is false
    }

    mapping(address => Tenant) tenants;
    address landlord;
    uint totalRentPrice;

    event LogPaymentMade(address accountAddress, uint amount);

    function LandLordContract(uint _totalRentPrice) {
        landlord = msg.sender;
        totalRentPrice = _totalRentPrice;
    }

    function addTenant(address t, bytes32 nameToAdd, uint owed, uint paid) {
        require((msg.sender == landlord) && (!tenants[t].hasVal));

        tenants[t] = Tenant({
            name: nameToAdd,
            totalOwed: owed,
            paidSoFar: paid,
            hasVal: true
        });
    }

    function pay() public payable returns (uint) {
        tenants[msg.sender].paidSoFar += msg.value;
        LogPaymentMade(msg.sender, msg.value);
        return tenants[msg.sender].totalOwed - tenants[msg.sender].paidSoFar;
    }

    function getTenant(address _address) returns (bytes32, uint, uint, bool) {
        return (tenants[_address].name, tenants[_address].totalOwed,
                tenants[_address].paidSoFar, tenants[_address].hasVal);
    }

}
