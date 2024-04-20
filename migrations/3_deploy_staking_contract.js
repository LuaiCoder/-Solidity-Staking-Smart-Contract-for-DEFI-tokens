const DEFIToken = artifacts.require("DEFIToken");
const StakingContract = artifacts.require("StakingContract");

module.exports = async function (deployer) {
  // Deploy DEFIToken
  await deployer.deploy(DEFIToken);
  const defiTokenInstance = await DEFIToken.deployed();

  // Deploy StakingContract with DEFIToken address as constructor argument
  await deployer.deploy(StakingContract, defiTokenInstance.address);
};
