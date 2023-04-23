// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract ERC20Coin is ERC20, ERC20Burnable,AccessControl {

    uint256 public mintPrice;
    uint256 public mintTokenNumber;
    address payable paymentAddress;
    mapping (address => uint256) userLastMintTimes;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    constructor(uint256 _mintPrice, uint256 _mintTokenNumber) ERC20("ERC20Coin", "ERC") {
        _mint(msg.sender, 1000 * 10 ** decimals());
        mintPrice = _mintPrice;
        mintTokenNumber = _mintTokenNumber;
        paymentAddress = payable(msg.sender);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address _to) external payable onlyRole(MINTER_ROLE){
        require(msg.value >= mintPrice, "Insufficient funds");
        require((block.timestamp - userLastMintTimes[msg.sender]) > 1 days, "You can only mint 1 time every 24 hours");
        userLastMintTimes[msg.sender] = block.timestamp;
        _mint(_to, mintTokenNumber);  
    }

    function withdraw() external  {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(paymentAddress).transfer(address(this).balance);
    }
}