pragma solidity ^0.4.4;

// import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	address owner;
	uint256 _totalSupply = 10000;

	mapping (address => uint256) balances;
	mapping (address => mapping (address => uint)) allowed;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _collector, uint256 _value);

	function MetaCoin() {
		owner = msg.sender;
		balances[msg.sender] = 10000;
	}

	function totalSupply() constant returns (uint256 totalSupply){
		totalSupply = _totalSupply;
	}

	function coinsOwned() returns(uint256){
		return balances[this];
	}

	function getOwner() returns(address){
		return owner;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	// Takes money from a user, if user approved beforehand.
	function takeCoin(address _from, address _to, uint256 _amount) returns (bool success){
		if (balances[_from] >= _amount
			&& allowed[_from][msg.sender] >= _amount //See if [owner] approved [msg.sender]
			&& _amount > 0
			&& balances[_to] + _amount > balances[_to]){
				balances[_from] -= _amount;
				allowed[_from][msg.sender] -= _amount;
				balances[_to] += _amount;
				Transfer(_from, _to, _amount);
				return true;
			} else {
				return false;
			}
	}

	//Custom implementation of approve.
	function approve(address owner, address collector, uint256 amount) returns (bool success){
		allowed[owner][collector] = amount;
		Approval(owner, collector, amount);
		return true;
	}

	/*// Approval for takeCoin
	function approve(address _collector, uint256 _amount) returns (bool success){
		allowed[msg.sender][_collector] = _amount; // [msg.sender] approves [_spender]
		Approval(msg.sender, _collector, _amount);
		return true;
	}*/

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}

}
