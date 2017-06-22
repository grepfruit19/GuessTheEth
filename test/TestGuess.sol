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

  /*function testPeekAndPop() {
      Guess guess = Guess(DeployedAddresses.Guess());
      int firstPeek = guess.peekNumber();
      int firstPop = guess.popNumber();
      Assert.equal(firstPeek, firstPop, "Peek should not change the current number");

      int[] testValues = new int[];
      int[4] correctArray = [4, 2, 5, 1];
      for (int i = 0; i < 4; i++){
          testValues[i] = guess.popNumber();
      }
      Assert.equal(testValues, correctArray, "Pop should change the current number");

      int loopPop = guess.popNumber();
      Assert.equal(3, loopPop, "Reaching end of array should restart the array");
  }*/


}
