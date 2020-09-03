//@ sourceMappingURL=merchant_account_gateway.map
// Generated by CoffeeScript 1.6.1
var Gateway, MerchantAccount, MerchantAccountGateway, exceptions,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gateway = require('./gateway').Gateway;

MerchantAccount = require('./merchant_account').MerchantAccount;

exceptions = require('./exceptions');

MerchantAccountGateway = (function(_super) {

  __extends(MerchantAccountGateway, _super);

  function MerchantAccountGateway(gateway) {
    this.gateway = gateway;
  }

  MerchantAccountGateway.prototype.create = function(attributes, callback) {
    return this.gateway.http.post('/merchant_accounts/create_via_api', {
      merchantAccount: attributes
    }, this.responseHandler(callback));
  };

  MerchantAccountGateway.prototype.update = function(id, attributes, callback) {
    return this.gateway.http.put("/merchant_accounts/" + id + "/update_via_api", {
      merchantAccount: attributes
    }, this.responseHandler(callback));
  };

  MerchantAccountGateway.prototype.find = function(id, callback) {
    if (id.trim() === '') {
      return callback(exceptions.NotFoundError("Not Found"), null);
    } else {
      return this.gateway.http.get("/merchant_accounts/" + id, function(err, response) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, new MerchantAccount(response.merchantAccount));
        }
      });
    }
  };

  MerchantAccountGateway.prototype.responseHandler = function(callback) {
    return this.createResponseHandler("merchantAccount", MerchantAccount, callback);
  };

  return MerchantAccountGateway;

})(Gateway);

exports.MerchantAccountGateway = MerchantAccountGateway;