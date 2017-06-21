var Guess = artifacts.require("./Guess.sol");

contract('Guess', function(accounts){
    it("should give users 100 coins upon registration", function(){
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
            console.log(instance);
            console.log(account);
            return guess.registerUser();
        });

    });
});
