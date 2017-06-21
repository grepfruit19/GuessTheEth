pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Guess.sol";

contract TestGuess {

  function testInitialBalance() {
    Guess guess = Guess(DeployedAddresses.Guess());
    guess.initializeCoin();
    uint actual = guess.getOwnBalance();

    uint expected = 10000;

    Assert.equal(actual, expected, "Owner should have 10000 MetaCoin initially");
  }

/*
  function testInitialBalanceWithNewMetaCoin() {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }*/

}
