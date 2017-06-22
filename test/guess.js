var Guess = artifacts.require("./Guess.sol");
var Promise = require('bluebird');

// This is a promise loop function used for the peek/pop test.
function promiseWhile(condition, action) {
    var resolver = Promise.defer();

    var loop = function() {
        if (!condition()) return resolver.resolve();
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject);
    };

    process.nextTick(loop);

    return resolver.promise;
};


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

        var iterator = 0;
        var stop = 4;

        // I tried using Promise loops but they caused more problems than they fixed
        // So you have to look at this terrible, terrible chain of promises.
        // Thank god for Promises.
        return Guess.deployed().then(function(instance){
            guess = instance;
            return guess.peekNumber.call();
        }).then(function(number){
            firstPeek = number.toNumber();
            return guess.popNumber.call();
        }).then(function(number){
            firstPop = number;
            return guess.popNumber(); //Now the array should be on the second element
        }).then(function(transaction){
            return guess.popNumber.call(); // Pop
        }).then(function(number){
            testArray.push(number.toNumber()); // Get value 4
            return guess.popNumber();
        }).then(function(transaction){
            return guess.popNumber.call(); // Pop
        }).then(function(number){
            testArray.push(number.toNumber()); // Get value
            return guess.popNumber();
        }).then(function(transaction){
            return guess.popNumber.call(); // Pop
        }).then(function(number){
            testArray.push(number.toNumber()); // Get value
            return guess.popNumber();
        }).then(function(transaction){
            return guess.popNumber.call(); // Pop
        }).then(function(number){
            testArray.push(number.toNumber()); // Get value -- This should be the end of the "loop"
            return guess.popNumber();
        }).then(function(transaction){
            return guess.popNumber.call(); // Pop
        }).then(function(number){
            loopedNum = number; // Post loop, should be value 3.
            return guess.popNumber();

            assert.equal(firstPeek, firstPop, "Peek should not change the array");
            assert.equal(testArray, correctArray, "Pop should change the index");
            assert.equal(loopedNum, 3, "Array should loop after completion");
        });
    });

});
