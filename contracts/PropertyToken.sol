// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PropertyTitle.sol";

/**
 * @title PropertyToken
 * @dev Enables fractional ownership of properties through tokenization
 */
contract PropertyToken {
    PropertyTitle public propertyTitle;
    address public admin;
    
    struct TokenizedProperty {
        string propertyId;
        uint256 totalShares;
        uint256 availableShares;
        uint256 pricePerShare;
        bool isActive;
        address propertyOwner;
    }
    
    // Mapping from property ID to TokenizedProperty
    mapping(string => TokenizedProperty) public tokenizedProperties;
    
    // Mapping from property ID to owner address to shares
    mapping(string => mapping(address => uint256)) public shares;
    
    // Events
    event PropertyTokenized(string propertyId, uint256 totalShares, uint256 pricePerShare);
    event SharesPurchased(string propertyId, address buyer, uint256 shares, uint256 totalCost);
    event SharesTransferred(string propertyId, address from, address to, uint256 shares);
    event TokenizationDeactivated(string propertyId);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    constructor(address _propertyTitleAddress) {
        propertyTitle = PropertyTitle(_propertyTitleAddress);
        admin = msg.sender;
    }
    
    /**
     * @dev Tokenize a property
     * @param propertyId ID of the property
     * @param totalShares Total number of shares to create
     * @param pricePerShare Price per share in wei
     */
    function tokenizeProperty(
        string memory propertyId,
        uint256 totalShares,
        uint256 pricePerShare
    ) public {
        // Get property info from PropertyTitle contract
        PropertyTitle.Property memory property = propertyTitle.getProperty(propertyId);
        
        // Check if sender is the owner
        require(property.owner == msg.sender, "Only property owner can tokenize");
        require(property.isVerified, "Property must be verified to tokenize");
        require(totalShares > 0, "Total shares must be greater than zero");
        require(pricePerShare > 0, "Price per share must be greater than zero");
        
        tokenizedProperties[propertyId] = TokenizedProperty({
            propertyId: propertyId,
            totalShares: totalShares,
            availableShares: totalShares,
            pricePerShare: pricePerShare,
            isActive: true,
            propertyOwner: msg.sender
        });
        
        emit PropertyTokenized(propertyId, totalShares, pricePerShare);
    }
    
    /**
     * @dev Buy shares of a tokenized property
     * @param propertyId ID of the property
     * @param numberOfShares Number of shares to buy
     */
    function buyShares(string memory propertyId, uint256 numberOfShares) public payable {
        TokenizedProperty storage tokenizedProperty = tokenizedProperties[propertyId];
        
        require(tokenizedProperty.isActive, "Property is not actively tokenized");
        require(numberOfShares > 0, "Number of shares must be greater than zero");
        require(numberOfShares <= tokenizedProperty.availableShares, "Not enough shares available");
        
        uint256 totalCost = tokenizedProperty.pricePerShare * numberOfShares;
        require(msg.value >= totalCost, "Insufficient funds sent");
        
        // Update available shares
        tokenizedProperty.availableShares -= numberOfShares;
        
        // Update buyer's shares
        shares[propertyId][msg.sender] += numberOfShares;
        
        // Transfer funds to property owner
        payable(tokenizedProperty.propertyOwner).transfer(totalCost);
        
        // Refund excess payment
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        
        emit SharesPurchased(propertyId, msg.sender, numberOfShares, totalCost);
    }
    
    /**
     * @dev Transfer shares to another user
     * @param propertyId ID of the property
     * @param to Address to transfer shares to
     * @param numberOfShares Number of shares to transfer
     */
    function transferShares(string memory propertyId, address to, uint256 numberOfShares) public {
        require(to != address(0), "Cannot transfer to zero address");
        require(shares[propertyId][msg.sender] >= numberOfShares, "Not enough shares to transfer");
        
        shares[propertyId][msg.sender] -= numberOfShares;
        shares[propertyId][to] += numberOfShares;
        
        emit SharesTransferred(propertyId, msg.sender, to, numberOfShares);
    }
    
    /**
     * @dev Deactivate property tokenization (only property owner)
     * @param propertyId ID of the property
     */
    function deactivateTokenization(string memory propertyId) public {
        TokenizedProperty storage tokenizedProperty = tokenizedProperties[propertyId];
        
        require(tokenizedProperty.propertyOwner == msg.sender, "Only property owner can deactivate");
        require(tokenizedProperty.isActive, "Tokenization already inactive");
        require(tokenizedProperty.availableShares == tokenizedProperty.totalShares, "All shares must be available");
        
        tokenizedProperty.isActive = false;
        
        emit TokenizationDeactivated(propertyId);
    }
    
    /**
     * @dev Get number of shares owned by an address
     * @param propertyId ID of the property
     * @param owner Address of the share owner
     * @return Number of shares owned
     */
    function sharesOf(string memory propertyId, address owner) public view returns (uint256) {
        return shares[propertyId][owner];
    }
    
    /**
     * @dev Get property tokenization information
     * @param propertyId ID of the property
     * @return TokenizedProperty information
     */
    function getPropertyTokenInfo(string memory propertyId) public view returns (TokenizedProperty memory) {
        return tokenizedProperties[propertyId];
    }
}
