const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MedChain Registry...");

  // Get the ContractFactory and Signers here.
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy the contract
  const MedChainRegistry = await ethers.getContractFactory("MedChainRegistry");
  const medChainRegistry = await MedChainRegistry.deploy();

  await medChainRegistry.deployed();

  console.log("MedChainRegistry deployed to:", medChainRegistry.address);
  console.log("Transaction hash:", medChainRegistry.deployTransaction.hash);

  // Save the contract address and ABI
  const fs = require('fs');
  const contractsDir = './src/contracts';

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    contractsDir + '/contract-address.json',
    JSON.stringify({ MedChainRegistry: medChainRegistry.address }, undefined, 2)
  );

  const MedChainRegistryArtifact = artifacts.readArtifactSync("MedChainRegistry");

  fs.writeFileSync(
    contractsDir + '/MedChainRegistry.json',
    JSON.stringify(MedChainRegistryArtifact, null, 2)
  );

  console.log("Contract address and ABI saved to src/contracts/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });