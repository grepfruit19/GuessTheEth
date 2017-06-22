var Guess = artifacts.require("./Guess.sol");
var Promise = require('bluebird');

contract('Guess', function(accounts){
    it("should give users 100 coins upon registration, but not double credit", function(){
        var guess;

        var account = accounts[0];
        var firstReg;
        var acctBalanceOne;
        var ownBalanceOne;
        var secondReg;
        var acctBalanceTwo;
        var ownBalanceTwo;

        return Guess.deployed().then(function(instance){
            guess = instance;
            return guess.initializeCoin();
        }).then(function(instance){
            return guess.registerUser({from: account});
        }).then(function(success){
            return guess.getOwnBalance.call();
        }).then(function(ownBalance){
            ownBalanceOne = ownBalance;
            return guess.getBalance.call(account);
        }).then(function(acctBalance){
            acctBalanceOne = acctBalance;
            return guess.registerUser({from: account});
        }).then(function(success){
            return guess.getOwnBalance.call();
        }).then(function(ownBalance){
            ownBalanceTwo = ownBalance;
            return guess.getBalance.call(account);
        }).then(function(acctBalance){
            acctBalanceTwo = acctBalance;

            assert.equal(ownBalanceOne, 9900, "Coins should be deducted from store");
            assert.equal(acctBalanceOne, 100, "Coins should be credited to account");
            assert.equal(ownBalanceTwo, 9900, "Coins should not be deducted twice");
            assert.equal(acctBalanceTwo, 100, "Coins should not be credited twice");
        });

    });
    it("peek and pop functions work correctly", function(){
        var guess;

        var firstPeek;
        var firstPop;
        var testArray = [];
        var correctArray = [4, 2, 5, 1];
        var loopedNum;

        // This next part is going to be more painful to read than it was to write.
        // but I didn't feel like taking time out to learn Promise loops while writing this
        return Guess.deployed().then(function(instance){
            guess = instance;
            return guess.peekNumber.call();
        }).then(function(number){
            firstPeek = number.toNumber();
            return guess.popNumber.call();
        }).then(function(number){
            firstPop = number;
            return guess.popNumber();
        })

            assert.equal(firstPeek, firstPop, "Peek should not change the array");
            assert.equal(testArray, correctArray, "Pop should change the index");
            assert.equal(loopedNum, 3, "Array should loop after completion");
        })
    });
});
