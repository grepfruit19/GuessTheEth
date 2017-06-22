pragma solidity ^0.4.4;

import "./MetaCoin.sol";

contract Guess {
    MetaCoin coin;
    uint index = 0;
    uint numArrayMax = 5;
    int[5] numArray;

    mapping (address => bool) registered;


    function Guess(){
        //Random numbers
        numArray = [3,4,2,5,1];
    }

    // Construct MetaCoin and credit 10k to this contract.
    function initializeCoin() returns (address){
        MetaCoin metaCoin = new MetaCoin();
        coin = metaCoin;
        return metaCoin;
    }

    function getOwnBalance() returns (uint){
        return coin.getBalance(this);
    }

    function getBalance(address arg) returns (uint){
        return coin.getBalance(arg);
    }

    function registerUser() returns (bool){
        address currentAddress = msg.sender;

        if (registered[currentAddress] == false){
            registered[currentAddress] = true;
            coin.sendCoin(currentAddress, 100);
            return true;
        } else {
            return false;
        }
    }

    function takeGuess(uint guess) {
        /*
        if balance<10, no

        */
    }

    // Returns current number without moving index.
    function peekNumber() returns (int){
        return numArray[index];
    }

    // Returns current number and increments index.
    function popNumber() returns (int){
        int output;
        if (index == numArrayMax -1){
            output = numArray[index];
            index = 0;
        } else {
            output = numArray[index];
            index = index + 1;
        }
        return output;
    }

}
