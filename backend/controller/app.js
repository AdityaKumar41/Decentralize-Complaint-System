const ethers = require("ethers");
require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {
  abi,
} = require("../artifacts/contracts/ContractApi.sol/ComplaintManagementSystem.json");
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

function setComplaints(req, res) {
  try {
    const { discription } = req.body;
    const data = contractInstance.submitComplaint(discription);

    res.json({ data });
  } catch (error) {}
}

function getComplaints(req, res) {
  try {
    const _complaintId = req.body.complaintId;
    const data = contractInstance.getComplaint(_complaintId);

    res.json({ data });
  } catch (error) {}
}

module.exports = {
  setComplaints,
  getComplaints,
};
