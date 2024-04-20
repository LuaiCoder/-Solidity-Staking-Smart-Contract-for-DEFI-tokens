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

    Compile the smart contracts:

    python

truffle compile

Run the migration to deploy the smart contracts:

    truffle migrate

## Run Tests

Before running tests, make sure the contracts are compiled and deployed.

bash

truffle test

This will execute the test scripts in the test/ directory and display the results.
Test Scenario
Scenario 1: Staking 1000 DEFI for 10 days

This test checks the staking functionality and rewards calculation.

    User A stakes 1000 DEFI tokens.
    Fast-forward 10 days.
    User A claims the rewards and unstakes the tokens.

Expected Outcome:

    User A should receive the original staked amount plus the calculated rewards.

Contributing

Feel free to contribute to this project by creating issues or pull requests.
License

This project is licensed under the MIT License. See LICENSE for more information.
