# -Solidity-Staking-Smart-Contract-for-DEFI-tokens
A staking contract where the investors could stake their DEFI tokens in exchange for DEFI as yield which would be deducted from the team segment of the token supply as they are taking longer to deliver
## Prerequisites

    Node.js and npm installed
    Truffle framework installed (npm install -g truffle)

## Project Structure

    contracts/: Contains the Solidity smart contract files.
    migrations/: Contains the migration scripts for deploying contracts.
    test/: Contains the test scripts written for the smart contract.
    truffle-config.js: Truffle configuration file.


## Install the dependencies:

    npm install

## Deploy Smart Contract

#Compile the smart contracts:

    truffle compile

#Run the migration to deploy the smart contracts:

    truffle migrate

## Run Tests

Before running tests, make sure the contracts are compiled and deployed.

    truffle test

This will execute the test scripts in the test/ directory and display the results.

## Test Scenario

Scenario 1: Staking 1000 DEFI for 10 days

This test checks the staking functionality and rewards calculation.

    User A stakes 1000 DEFI tokens.
    Fast-forward 10 days.
    User A claims the rewards and unstakes the tokens.

Expected Outcome:

    User now has 10,000 tokens for testing
    User balance before Staking should be 10,000
    User Balance Before Staking : 10000000000000000000000
    After Staking 1,000, User Balance should be 9,000
    User Balance After Staking 1000 tokens: 9000000000000000000000
    Staked amount should be 1,000
    Current Staked Amount: 1000000000000000000000
    should calculate the correct reward for 10 days = 10 (1 DEFI per day) and pay the reward to the user
    Calculated Reward: 10000000000000000000
    Reward has been paid to the user
    Unstaked amount should be Zero
    Current Staked Amount After Unstake: 0
    User account should be 10,000 + 10
    Calculated balanceAfterUnstake: 10010000000000000000000


Second Scenario: User A stakes 100 DEFI tokens for 10 days, and stakes 900 DEFI tokens for 10 days later

This test checks the staking functionality and rewards calculation.

    User A stakes 100 DEFI tokens.
    Fast-forward 10 days.
    User A stakes another 900 DEFI tokens after 10 days.
    Fast-forward another 10 days.
    User A claims the rewards and unstakes the tokens.

Expected Outcome:

    User now has 10,000 tokens for testing
    User balance before Staking should be 10,000
    Calculated BalnaceBeforeST: 10000000000000000000000
    After Staking 100, user balance should be 9,900
    Calculated Balance After STaking First 100 tokens: 9900000000000000000000
    Staked amount should be 100
    Current Staked Amount: 100000000000000000000
    No reward because Staked Amount is less than 100
    Calculated Reward: 0
    No rewards
    After Staking another 900, user balance should be 9,000
    Calculated Balance After Staking Second Time: 9000000000000000000000
    Staking another 900 tokens to be added to same Staked account, Staked amount should now be 1,000
    Current Staked Amount : 1000000000000000000000
    should calculate the correct reward for 10 days = 10 (1 DEFI per day) and pay the reward to the user
    Calculated Reward: 10000000000000000000
    Reward has been paid to the user
    Unstaked amount should be Zero
    Current Staked Amount After Unstake: 0
    Final User account should have 1000 tokens plus 10 tokens
    Calculated balanceAfterWithdraw2: 10010000000000000000000


