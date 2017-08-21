import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));
}

contractAddress = "0xd7648d3a8d747a6329a86178a714813cbd7505f3";
ABIArray = [{"constant":false,"inputs":[],"name":"pay","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"totalRentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"t","type":"address"},{"name":"nameToAdd","type":"bytes32"},{"name":"owed","type":"uint256"},{"name":"paid","type":"uint256"}],"name":"addTenant","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"landlord","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getTenant","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"tenants","outputs":[{"name":"name","type":"bytes32"},{"name":"totalOwed","type":"uint256"},{"name":"paidSoFar","type":"uint256"},{"name":"hasVal","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"_totalRentPrice","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"accountAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogPaymentMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tenantAddress","type":"address"},{"indexed":false,"name":"nameToAdd","type":"bytes32"}],"name":"LogAddTenant","type":"event"}];
data = "6060604052341561000f57600080fd5b6040516020806107b4833981016040528080519060200190919050505b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806002819055505b505b61072e806100866000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631b9265b81461007b57806385778b0c14610099578063db9e31ae146100c2578063dc1997ea1461011a578063e5cdb4881461016f578063fd9153a3146101dd575b600080fd5b61008361024b565b6040518082815260200191505060405180910390f35b34156100a457600080fd5b6100ac610392565b6040518082815260200191505060405180910390f35b34156100cd57600080fd5b610118600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560001916906020019091908035906020019091908035906020019091905050610398565b005b341561012557600080fd5b61012d610574565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561017a57600080fd5b6101a6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061059a565b6040518085600019166000191681526020018481526020018381526020018215151515815260200194505050505060405180910390f35b34156101e857600080fd5b610214600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106c5565b6040518085600019166000191681526020018481526020018381526020018215151515815260200194505050505060405180910390f35b6000346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055507f9681ff80e7509a85367bbe3e41c00e9a48dc4d0bedb61321690e83e6f8489fd83334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101540390505b90565b60025481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561044157506000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff16155b151561044c57600080fd5b7f965564986c9ff7514ae58bb5f0979424426932abca6bd73b44dec85e443bc4b18484604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600019166000191681526020019250505060405180910390a160806040519081016040528084600019168152602001838152602001828152602001600115158152506000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190600019169055602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083151502179055509050505b50505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1693509350935093505b9193509193565b60006020528060005260406000206000915090508060000154908060010154908060020154908060030160009054906101000a900460ff169050845600a165627a7a723058202d1e9c188b7ef25f74ba7478d9e6895bad4d0900270ddbfb08729231836c3acf0029";

myContract = web3.eth.contract(ABIArray).at(contractAddress);
console.log(myContract.tenants);

$(document).ready(function() {
    $("#addTenantButton").click(function() {
        let address = document.getElementById("address").value;
        let name = document.getElementById("name").value;
        let owed = document.getElementById("owed").value;
        let paid = document.getElementById("paid").value;

        myContract.addTenant.call(address, name, owed, paid, function(err, res) {
            console.log(res);
        });
    });
});

$(document).ready(function() {
    $("#getTenantButton").click(function() {
        let address = document.getElementById("address").value;
        
        console.log(myContract.getTenant(address, function(err, res) {
            console.log(res);
        }));
    });
});

//0x2575b15E3D0fe4491E5c978612109c1ffFbF780a