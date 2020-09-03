//@ sourceMappingURL=config.map
// Generated by CoffeeScript 1.6.1
var Config;

Config = (function() {

  function Config(rawConfig) {
    this.apiVersion = '4';
    this.environment = rawConfig.environment;
    this.merchantId = rawConfig.merchantId || rawConfig.partnerId;
    this.publicKey = rawConfig.publicKey;
    this.privateKey = rawConfig.privateKey;
    this.baseMerchantPath = "/merchants/" + rawConfig.merchantId;
  }

  Config.prototype.baseMerchantUrl = function() {
    return this.environment.baseUrl() + this.baseMerchantPath;
  };

  return Config;

})();

exports.Config = Config;