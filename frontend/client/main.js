import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));
}

contractAddress = "0x41C7a567348F857fF756554BF55718E6948A469E";
ABIArray = [{"constant":false,"inputs":[],"name":"pay","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"t","type":"address"},{"name":"nameToAdd","type":"bytes32"},{"name":"owed","type":"uint256"},{"name":"paid","type":"uint256"}],"name":"addTenant","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getTenant","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"_totalRentPrice","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"accountAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogPaymentMade","type":"event"}];
data = "6060604052341561000f57600080fd5b6040516020806105c5833981016040528080519060200190919050505b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806002819055505b505b61053f806100866000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631b9265b814610054578063db9e31ae14610072578063e5cdb488146100ca575b600080fd5b61005c610138565b6040518082815260200191505060405180910390f35b341561007d57600080fd5b6100c8600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190803590602001909190803590602001909190505061027f565b005b34156100d557600080fd5b610101600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103e8565b6040518085600019166000191681526020018481526020018381526020018215151515815260200194505050505060405180910390f35b6000346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055507f9681ff80e7509a85367bbe3e41c00e9a48dc4d0bedb61321690e83e6f8489fd83334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101540390505b90565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561032857506000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff16155b151561033357600080fd5b60806040519081016040528084600019168152602001838152602001828152602001600115158152506000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190600019169055602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083151502179055509050505b50505050565b6000806000806000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1693509350935093505b91935091935600a165627a7a72305820e514fec202a8c38a1bc23730abe2fa2cfcf1a4f194d354b8d8e3532fb8a7001e0029";

myContract = web3.eth.contract(ABIArray).at(contractAddress);
console.log(myContract);

$(document).ready(function() {
    $("#addTenantButton").click(function() {
        let address = document.getElementById("address").value;
        let name = document.getElementById("name").value;
        let owed = document.getElementById("owed").value;
        let paid = document.getElementById("paid").value;

        myContract.addTenant(address, name, owed, paid, function(err, res) {
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




// Template.hello.onCreated(function helloOnCreated() {
//   // addTenant starts at 0
//   this.addTenant = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   // addTenant(address, nameToAdd, owed, paid) {
//   //   var template = Template.instance();
//   //
//   //   myContract = web3.eth.contract(ABIArray).at(contractAddress);
//   //   // console.log(myContract.getTenant(0xF71fcD9B33EC617525951D73EF78CD92aE9069b3));
//   // }
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     var address = document.getElementById("address");
//     var name = document.getElementById("name");
//     var owed = document.getElementById("owed");
//     var paid = document.getElementById("paid");

//     let myContract = web3.eth.contract(ABIArray).at(contractAddress);

//     myContract.addTenant(1,2,3,4,5);
//     console.log(myContract.getTenant(address));
//   },
// });