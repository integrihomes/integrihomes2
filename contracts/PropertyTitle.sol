// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title PropertyTitle
 * @dev Manages property titles on the blockchain
 */
contract PropertyTitle {
    address public admin;
    
    struct Property {
        string id;
        address owner;
        string dataHash;      // IPFS hash of property data
        string documentHash;  // IPFS hash of property documents
        uint256 timestamp;
        bool isVerified;
    }
    
    // Mapping from property ID to Property
    mapping(string => Property) public properties;
    
    // Events
    event PropertyRegistered(string propertyId, address owner, uint256 timestamp);
    event PropertyTransferred(string propertyId, address previousOwner, address newOwner);
    event PropertyVerified(string propertyId);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyOwner(string memory propertyId) {
        require(properties[propertyId].owner == msg.sender, "Only property owner can call this function");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    /**
     * @dev Register a new property
     * @param propertyId Unique identifier for the property
     * @param owner Address of the property owner
     * @param dataHash IPFS hash of property data
     * @param documentHash IPFS hash of property documents
     */
    function registerProperty(
        string memory propertyId,
        address owner,
        string memory dataHash,
        string memory documentHash
    ) public onlyAdmin {
        require(bytes(properties[propertyId].id).length == 0, "Property already registered");
        
        properties[propertyId] = Property({
            id: propertyId,
            owner: owner,
            dataHash: dataHash,
            documentHash: documentHash,
            timestamp: block.timestamp,
            isVerified: false
        });
        
        emit PropertyRegistered(propertyId, owner, block.timestamp);
    }
    
    /**
     * @dev Transfer property ownership
     * @param propertyId ID of the property to transfer
     * @param newOwner Address of the new owner
     */
    function transferProperty(string memory propertyId, address newOwner) public onlyOwner(propertyId) {
        require(newOwner != address(0), "New owner cannot be zero address");
        
        address previousOwner = properties[propertyId].owner;
        properties[propertyId].owner = newOwner;
        
        emit PropertyTransferred(propertyId, previousOwner, newOwner);
    }
    
    /**
     * @dev Verify a property (only callable by admin)
     * @param propertyId ID of the property to verify
     */
    function verifyProperty(string memory propertyId) public onlyAdmin {
        require(bytes(properties[propertyId].id).length > 0, "Property does not exist");
        properties[propertyId].isVerified = true;
        
        emit PropertyVerified(propertyId);
    }
    
    /**
     * @dev Get property information
     * @param propertyId ID of the property
     * @return Property information
     */
    function getProperty(string memory propertyId) public view returns (Property memory) {
        require(bytes(properties[propertyId].id).length > 0, "Property does not exist");
        return properties[propertyId];
    }
}
