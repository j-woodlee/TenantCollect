pragma solidity ^0.4.0;

contract LandLordContract {

    struct Tenant {
        uint amountToPay;
        address tenant;
    }

    /*struct LandLord {
        uint pricePerMonth;
    }*/

    Tenant[] tenants;
    address landlord;

    function LandLordContract(uint numTenants, uint pricePerMonthPerTenant) {
        landlord = msg.sender;
        tenants.length = numTenants;
        for (uint t = 0; t < tenants.length; t++) { // bad syntax but whatever for now
            tenants[t].amountToPay = pricePerMonthPerTenant;
        }
    }
}
