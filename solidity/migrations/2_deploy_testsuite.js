var TestSuite = artifacts.require('TestSuite');

module.exports = function(deployer) {
    deployer.deploy(TestSuite);
}