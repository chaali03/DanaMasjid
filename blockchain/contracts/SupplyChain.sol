// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    enum ItemStatus { Created, InTransit, Delivered, Distributed }

    struct Item {
        uint256 id;
        string name;
        string description;
        uint256 quantity;
        ItemStatus status;
        address currentOwner;
        uint256 timestamp;
    }

    struct Donation {
        string donationId; // ID from Prisma/Backend
        address donor;
        uint256 amount;
        string purpose;
        uint256 timestamp;
        bool isUsed;
    }

    mapping(uint256 => Item) public items;
    mapping(string => Donation) public donations;
    uint256 public itemCount;

    event ItemCreated(uint256 id, string name, address owner);
    event ItemStatusChanged(uint256 id, ItemStatus status, address owner);
    event DonationRecorded(string donationId, address donor, uint256 amount);

    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function recordDonation(string memory _donationId, uint256 _amount, string memory _purpose) public {
        donations[_donationId] = Donation({
            donationId: _donationId,
            donor: msg.sender,
            amount: _amount,
            purpose: _purpose,
            timestamp: block.timestamp,
            isUsed: false
        });
        emit DonationRecorded(_donationId, msg.sender, _amount);
    }

    function createItem(string memory _name, string memory _description, uint256 _quantity) public onlyAdmin {
        itemCount++;
        items[itemCount] = Item({
            id: itemCount,
            name: _name,
            description: _description,
            quantity: _quantity,
            status: ItemStatus.Created,
            currentOwner: admin,
            timestamp: block.timestamp
        });
        emit ItemCreated(itemCount, _name, admin);
    }

    function updateItemStatus(uint256 _id, ItemStatus _status) public onlyAdmin {
        require(_id > 0 && _id <= itemCount, "Invalid item ID");
        items[_id].status = _status;
        items[_id].timestamp = block.timestamp;
        emit ItemStatusChanged(_id, _status, admin);
    }

    function getDonation(string memory _donationId) public view returns (Donation memory) {
        return donations[_donationId];
    }
}
