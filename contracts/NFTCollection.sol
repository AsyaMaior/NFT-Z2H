// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint public mintPrice = 0.001 ether;
    uint public maxSupply;
    uint public currentSupply = totalSupply();
    bool public mintActicated;
    string baseURI = 'ipfs://Qmc4jrpChWyQRaDhUjs7GCjBWn5qMV4Zs4UnV4WZGeooFF/'; 
    
    mapping(address => uint) public mintPerWallet;

    constructor() payable ERC721('Retro Car', 'RC') {
        maxSupply = 25;
    } 

    function activeMint() public onlyOwner {
        mintActicated = !mintActicated;
    }
    
    function setMaxSupply(uint _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function _baseURI() internal override view returns(string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns(string memory) {
        _requireMinted(tokenId); //функция ERC721 - проверяет заминтился ли токен
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    function mint() external payable {
        require(mintActicated, 'Mint is not activated');
        require(mintPerWallet[msg.sender] < 1, 'You have already minted');
        require(msg.value == mintPrice, 'You pay incorrect amount of money. Pay 0.001 tBNB');
        require(maxSupply > currentSupply, 'This NFT collecction Sold Out');

        mintPerWallet[msg.sender]++;
        currentSupply++;
        uint tokenId = currentSupply;
        _safeMint(msg.sender, tokenId);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}