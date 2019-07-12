# TestSuite dapp

Platforms and users that interact with ERC20 tokens expect a certain behaviour from those smart contracts.
Nowadays security audit is the only way to check the compliance with the standard.
This option is expensive and slow.
Moreover auditors often check source code rather than the deployed contract itself, so they don't consider current state of the smart contract.

TestSuite is a DApp that checks compliance of a deployed token with [ERC20 standard](https://eips.ethereum.org/EIPS/eip-20).
The test results along with their evidence are available on-chain and in the web-interface.

# How to use
There are different options, how you can run tests.

### Via web interface
Go to the [testsuite.net](http://testsuite.net), then follow the steps on the website. You will need metamask to interact with the DApp.

### Directly call smart contract
TestSuite smart contract is deployed at [Mainnet](https://etherscan.io/address/0x1e7Aff4f505d2fa5E8D1f08659d4EeA9110abD8F), [Ropsten](https://ropsten.etherscan.io/address/0x34016BCF8aEdE81e193cfE12f8E4298516EEF186) and [Kovan](https://kovan.etherscan.io/address/0x897179dD89FB07B1773B1f0E1371F13f754C78cD). Just call `check(address token)` function. You can get results via `testResults(address token)` function.

Check the [`solidity/README.md`](solidity/README.md#test-results-representation) to correctly interpret returned number.

# Project structure

The project consists of two parts:
- truffle project in [`solidity`](solidity/) directory
- frontend in [`front`](front/) directory

Each part has it's own documentation.