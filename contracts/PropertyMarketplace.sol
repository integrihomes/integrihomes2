// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PropertyTitle.sol";

/**
 * @title PropertyMarketplace
 * @dev Facilitates buying and selling of properties
 */
contract PropertyMarketplace {
    PropertyTitle public propertyTitle;
    
    struct Listing {
        string propertyId;
        address seller;
        uint256 price;
        bool isActive;
    }
    
    // Mapping from property ID to Listing
    mapping(string => Listing) public listings;
    
    // Events
    event PropertyListed(string propertyId, address seller, uint256 price);
    event PropertySold(string propertyId, address seller, address buyer, uint256 price);
    event ListingCancelled(string propertyId, address seller);
    
    constructor(address _propertyTitleAddress) {
        propertyTitle = PropertyTitle(_propertyTitleAddress);
    }
    
    /**
     * @dev List a property for sale
     * @param propertyId ID of the property
     * @param price Price in wei
     */
    function listProperty(string memory propertyId, uint256 price) public {
        // Get property info from PropertyTitle contract
        PropertyTitle.Property memory property = propertyTitle.getProperty(propertyId);
        
        // Check if sender is the owner
        require(property.owner == msg.sender, "Only property owner can list");
        require(property.isVerified, "Property must be verified to list");
        require(price > 0, "Price must be greater than zero");
        
        listings[propertyId] = Listing({
            propertyId: propertyId,
            seller: msg.sender,
            price: price,
            isActive: true
        });
        
        emit PropertyListed(propertyId, msg.sender, price);
    }
    
    /**
     * @dev Buy a property
     * @param propertyId ID of the property to buy
     */
    function buyProperty(string memory propertyId) public payable {
        Listing storage listing = listings[propertyId];
        
        require(listing.isActive, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient funds sent");
        require(msg.sender != listing.seller, "Seller cannot buy their own property");
        
        // Transfer ownership in PropertyTitle contract
        propertyTitle.transferProperty(propertyId, msg.sender);
        
        // Transfer funds to seller
        payable(listing.seller).transfer(msg.value);
        
        // Update listing
        listing.isActive = false;
        
        emit PropertySold(propertyId, listing.seller, msg.sender, msg.value);
    }
    
    /**
     * @dev Cancel a property listing
     * @param propertyId ID of the property
     */
    function cancelListing(string memory propertyId) public {
        Listing storage listing = listings[propertyId];
        
        require(listing.seller == msg.sender, "Only seller can cancel listing");
        require(listing.isActive, "Listing is not active");
        
        listing.isActive = false;
        
        emit ListingCancelled(propertyId, msg.sender);
    }
    
    /**
     * @dev Get listing information
     * @param propertyId ID of the property
     * @return Listing information
     */
    function getListing(string memory propertyId) public view returns (Listing memory) {
        return listings[propertyId];
    }
}
