var Guess = artifacts.require("./Guess.sol");

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

        // Access the contract's ABI
        return Guess.deployed().then(function(instance){
            guess = instance; // Assign ABI to var
            return guess.initializeCoin();
        }).then(function(){
            return guess.registerUser({from: account}); // {from: account} is a notation that
        }).then(function(){
            return guess.getOwnBalance.call(); // Note that this is a .call()
        }).then(function(ownBalance){ // ownBalance is the value returned by the call
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
    it("takeCoin works correctly", function(){
        var guess;

        var account = accounts[2];
        var approveSuccess;
        var takeCoinSuccess;
        var endBalance;

        return Guess.deployed().then(function(instance){
            guess = instance;
            return guess.initializeCoin();
        }).then(function(){
            return guess.registerUser({from: account});
        }).then(function(){
            return guess.getBalance.call(account);
        }).then(function(balance){
            return guess.approveValue.call(100);
        }).then(function(success){
            approveSuccess = success;
            return guess.approveValue(100, {from: account});
        }).then(function(){
            return guess.takeCoin.call(5, {from: account});
        }).then(function(success){
            assert.equal(success, true, "Called takeCoin");
            return guess.takeCoin(5, {from: account});
        }).then(function(){
            return guess.getBalance.call(account);
        }).then(function(balance){
            endBalance = balance.toNumber();

            assert.equal(true, approveSuccess, "Approve successful");
            assert.equal(endBalance, 95, "Took coins successfully");
        });
    });
    it("credits 4 coins on correct guess", function(){
        var guess;

        var account = accounts[3];
        var correctNumber;
        var origBalance;
        var finalBalance;
        var transactionStatus;

        return Guess.deployed().then(function(instance){
            guess = instance;
            return guess.initializeCoin();
        }).then(function(){
            return guess.registerUser({from: account});
        }).then(function(success){
            return guess.getBalance.call(account);
        }).then(function(balance){
            origBalance = balance.toNumber();
            return guess.peekNumber.call();
        }).then(function(number){
            correctNumber = number.toNumber();
            return guess.takeGuess.call(correctNumber, {from:account});
        }).then(function(success){
            transactionStatus = success;
            return guess.takeGuess(correctNumber, {from:account});
        }).then(function(success){
            return guess.getBalance.call(account);
        }).then(function(balance){
            finalBalance = balance.toNumber();

            assert.equal(origBalance, 100, "Registration okay");
            assert.equal(finalBalance, 104, "Coins credited on win");
            assert.equal(transactionStatus, true, "Transaction success");
        });
    });
    it("takes one coin on incorrect guess", function(){
        var guess;

        var account = accounts[4];
        var balancePreGuess;
        var approveSuccess;
        var guessSuccess;
        var balancePostGuess;

        return Guess.deployed().then(function(instance){
            guess = instance;
            return guess.initializeCoin();
        }).then(function(){
            return guess.registerUser({from: account});
        }).then(function(){
            return guess.getBalance.call(account);
        }).then(function(balance){
            balancePreGuess = balance.toNumber();
            assert.equal(balancePreGuess, 100, "Account initialized successfully");
            return guess.approveValue.call(1);
        }).then(function(success){
            approveSuccess = success;
            assert.equal(approveSuccess, true, "Approved successfully");
            return guess.approveValue(1, {from: account});
        }).then(function(){
            return guess.takeGuess.call(10, {from: account});
        }).then(function(success){
            guessSuccess = success;
            assert.equal(guessSuccess, true, "Guess went through correctly");
            return guess.takeGuess(10, {from: account});
        }).then(function(){
            return guess.getBalance.call(account);
        }).then(function(balance){
            balancePostGuess = balance.toNumber();
            assert.equal(balancePostGuess, 99, "One coin taken for incorrect guess");
        });
    });
});
