
# Complaint Management System

This project is a Complaint Management System built on the Ethereum blockchain using Hardhat, Node.js, and Ethers.js. It allows users to submit and resolve complaints, with support for public key management and owner verification.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/complaint-management-system.git
cd complaint-management-system
```

### Install Dependencies

```bash
npm install
```

### Configure Hardhat

Ensure your Hardhat configuration is set up for the Ethereum network you want to use. Modify the `hardhat.config.js` file to include network settings.

Example `hardhat.config.js`:

```javascript
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    rinkeby: {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

### Deploy the Smart Contract

Create a deployment script in the `scripts` directory. For example, `scripts/deploy.js`:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ComplaintManagementSystem = await ethers.getContractFactory("ComplaintManagementSystem");
  const complaintManagementSystem = await ComplaintManagementSystem.deploy();

  console.log("ComplaintManagementSystem deployed to:", complaintManagementSystem.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

### Interact with the Smart Contract

Create a script to interact with your deployed smart contract, e.g., `scripts/interact.js`:

```javascript
const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const abi = [
  // Add your contract ABI here
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function submitComplaint(description, publicKey) {
  const tx = await contract.submitComplaint(description, publicKey);
  await tx.wait();
  console.log("Complaint submitted!");
}

async function resolveComplaint(complaintId) {
  const tx = await contract.resolveComplaint(complaintId);
  await tx.wait();
  console.log("Complaint resolved!");
}

async function getComplaint(complaintId) {
  const complaint = await contract.getComplaint(complaintId);
  console.log(complaint);
}

async function main() {
  await submitComplaint("Complaint description", "user_public_key_here");
  await resolveComplaint(1);
  await getComplaint(1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Run the interaction script:

```bash
node scripts/interact.js
```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```dotenv
INFURA_URL=https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=YOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

### Testing

Write your tests in the `test` directory. Example test using Mocha and Chai:

```javascript
const { expect } = require("chai");

describe("ComplaintManagementSystem", function () {
  it("Should submit a complaint", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const ComplaintManagementSystem = await ethers.getContractFactory("ComplaintManagementSystem");
    const complaintManagementSystem = await ComplaintManagementSystem.deploy();

    await complaintManagementSystem.submitComplaint("Test complaint", "user_public_key_here");

    const complaint = await complaintManagementSystem.getComplaint(1);
    expect(complaint.description).to.equal("Test complaint");
  });
});
```

Run the tests:

```bash
npx hardhat test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/)
- [Ethereum](https://ethereum.org/)
