import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const supplyChain = await ethers.deployContract("SupplyChain");

  await supplyChain.waitForDeployment();

  console.log(
    `SupplyChain contract deployed to ${supplyChain.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
