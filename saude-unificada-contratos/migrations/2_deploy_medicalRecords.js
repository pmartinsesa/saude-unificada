const UnifiedHealthcare = artifacts.require('UnifiedHealthcare');


module.exports = function (deployer) {
    deployer.deploy(UnifiedHealthcare);
};