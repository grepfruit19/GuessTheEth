pragma solidity ^0.4.4;

contract Guess {
    address coinAddress;

    // Constructor, gives this contract 10k coins
    function Guess(){
        
    }

    function getContractAddress() constant returns (address){
        return this;
    }

}
