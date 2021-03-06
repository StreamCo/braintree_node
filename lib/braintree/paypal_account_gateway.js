//@ sourceMappingURL=paypal_account_gateway.map
// Generated by CoffeeScript 1.6.1
var Gateway, PayPalAccount, PayPalAccountGateway, exceptions,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gateway = require('./gateway').Gateway;

PayPalAccount = require('./paypal_account').PayPalAccount;

exceptions = require('./exceptions');

PayPalAccountGateway = (function(_super) {

  __extends(PayPalAccountGateway, _super);

  function PayPalAccountGateway(gateway) {
    this.gateway = gateway;
  }

  PayPalAccountGateway.prototype.find = function(token, callback) {
    if (token.trim() === '') {
      return callback(exceptions.NotFoundError("Not Found"), null);
    } else {
      return this.gateway.http.get("/payment_methods/paypal_account/" + token, function(err, response) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, new PayPalAccount(response.paypalAccount));
        }
      });
    }
  };

  PayPalAccountGateway.prototype.update = function(token, attributes, callback) {
    return this.gateway.http.put("/payment_methods/paypal_account/" + token, {
      paypalAccount: attributes
    }, this.responseHandler(callback));
  };

  PayPalAccountGateway.prototype["delete"] = function(token, callback) {
    return this.gateway.http["delete"]("/payment_methods/paypal_account/" + token, callback);
  };

  PayPalAccountGateway.prototype.responseHandler = function(callback) {
    return this.createResponseHandler("paypalAccount", PayPalAccount, callback);
  };

  return PayPalAccountGateway;

})(Gateway);

exports.PayPalAccountGateway = PayPalAccountGateway;
