pragma solidity ^0.4.4;

import "./MetaCoin.sol";

contract Guess {
    address coinAddress;

    // Constructor, gives this contract 10k coins
    function Guess(){
        MetaCoin metaCoin = new MetaCoin(); //I think this should give the contract 10k coins
    }

    function createCoin(){
        address metaCoin = new MetaCoin();
        coinAddress = metaCoin;
    }

    function getContractAddress() constant returns (address){
        return this;
    }


    /* Intended behavior:
        This contract should own 10,000 MetaCoin upon construction
        Has a static array of 10 elements with numbers [1,10]

        Users are gifted 100 coins upon sign-up.
        Users can guess a number, if they get it right, they are gifted 10 coins
        Lose 1 coin for each incorrect guess. (Check balance before I guess!)

        This contract should be the sole initiator of MetaCoin, nobody else can
        mint MetaCoin.

    */

}
