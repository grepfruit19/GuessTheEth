pragma solidity ^0.4.4;

import "./MetaCoin.sol";

contract Guess {
    MetaCoin coin;

    mapping (address => bool) registered;

    function Guess(){

    }

    // Gives this contract 10k coins.
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

    function getCoinAddress() constant returns (address){
        return coin;
    }

    function registerUser(address sender) returns (bool){
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

    /*
    Register new users and give them 100 MetaCoin

    */

}
