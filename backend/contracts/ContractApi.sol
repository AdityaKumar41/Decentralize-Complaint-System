// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ComplaintManagementSystem {
    enum ComplaintStatus {
        Pending,
        Resolved
    }

    struct Complaint {
        uint256 id;
        address complainant;
        string description;
        uint256 timestamp;
        ComplaintStatus status;
    }

    // State variables
    uint256 public complaintCount;
    address public owner;
    mapping(uint256 => Complaint) public complaints;

    // Events
    event ComplaintSubmitted(
        uint256 indexed id,
        address indexed complainant,
        string description
    );
    event ComplaintResolved(uint256 indexed id, address indexed resolver);

    // Modifier to restrict actions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // Set contract deployer as owner
    }

    // Function to submit a new complaint
    function submitComplaint(string memory _description) public {
        require(
            bytes(_description).length > 0,
            "Complaint description cannot be empty"
        );

        complaintCount++;

        complaints[complaintCount] = Complaint({
            id: complaintCount,
            complainant: msg.sender,
            description: _description,
            timestamp: block.timestamp,
            status: ComplaintStatus.Pending
        });

        emit ComplaintSubmitted(complaintCount, msg.sender, _description);
    }

    // Function to resolve a complaint (only owner can resolve)
    function resolveComplaint(uint256 _complaintId) public onlyOwner {
        require(
            _complaintId > 0 && _complaintId <= complaintCount,
            "Invalid complaint ID"
        );
        require(
            complaints[_complaintId].status == ComplaintStatus.Pending,
            "Complaint already resolved"
        );

        complaints[_complaintId].status = ComplaintStatus.Resolved;

        emit ComplaintResolved(_complaintId, msg.sender);
    }

    // Function to fetch complaint details
    function getComplaint(
        uint256 _complaintId
    )
        public
        view
        returns (uint256, address, string memory, uint256, ComplaintStatus)
    {
        require(
            _complaintId > 0 && _complaintId <= complaintCount,
            "Invalid complaint ID"
        );
        Complaint memory comp = complaints[_complaintId];
        return (
            comp.id,
            comp.complainant,
            comp.description,
            comp.timestamp,
            comp.status
        );
    }
}
