// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ComplaintManagementSystem = await ethers.getContractFactory(
    "ComplaintManagementSystem"
  );
  const complaintManagementSystem = await ComplaintManagementSystem.deploy();

  console.log(
    "ComplaintManagementSystem deployed to:",
    complaintManagementSystem.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
