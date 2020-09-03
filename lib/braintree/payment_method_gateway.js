//@ sourceMappingURL=payment_method_gateway.map
// Generated by CoffeeScript 1.6.1
var ApplePayCard, CreditCard, Gateway, PayPalAccount, PaymentMethodGateway, UnknownPaymentMethod, exceptions,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gateway = require('./gateway').Gateway;

ApplePayCard = require('./apple_pay_card').ApplePayCard;

CreditCard = require('./credit_card').CreditCard;

PayPalAccount = require('./paypal_account').PayPalAccount;

UnknownPaymentMethod = require('./unknown_payment_method').UnknownPaymentMethod;

exceptions = require('./exceptions');

PaymentMethodGateway = (function(_super) {

  __extends(PaymentMethodGateway, _super);

  function PaymentMethodGateway(gateway) {
    this.gateway = gateway;
  }

  PaymentMethodGateway.prototype.responseHandler = function(callback) {
    var responseMapping;
    responseMapping = {
      paypalAccount: PayPalAccount,
      creditCard: CreditCard,
      applePayCard: ApplePayCard
    };
    return this.createResponseHandler(responseMapping, null, function(err, response) {
      if (!err) {
        response.paymentMethod = PaymentMethodGateway.parsePaymentMethod(response);
      }
      return callback(err, response);
    });
  };

  PaymentMethodGateway.prototype.create = function(attributes, callback) {
    return this.gateway.http.post('/payment_methods', {
      paymentMethod: attributes
    }, this.responseHandler(callback));
  };

  PaymentMethodGateway.prototype.find = function(token, callback) {
    if (token.trim() === '') {
      return callback(exceptions.NotFoundError("Not Found"), null);
    } else {
      return this.gateway.http.get("/payment_methods/any/" + token, function(err, response) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, PaymentMethodGateway.parsePaymentMethod(response));
        }
      });
    }
  };

  PaymentMethodGateway.prototype.update = function(token, attributes, callback) {
    if (token.trim() === '') {
      return callback(exceptions.NotFoundError("Not Found"), null);
    } else {
      return this.gateway.http.put("/payment_methods/any/" + token, {
        paymentMethod: attributes
      }, this.responseHandler(callback));
    }
  };

  PaymentMethodGateway.parsePaymentMethod = function(response) {
    if (response.creditCard) {
      return new CreditCard(response.creditCard);
    } else if (response.paypalAccount) {
      return new PayPalAccount(response.paypalAccount);
    } else if (response.applePayCard) {
      return new ApplePayCard(response.applePayCard);
    } else {
      return new UnknownPaymentMethod(response);
    }
  };

  PaymentMethodGateway.prototype["delete"] = function(token, callback) {
    return this.gateway.http["delete"]("/payment_methods/any/" + token, callback);
  };

  return PaymentMethodGateway;

})(Gateway);

exports.PaymentMethodGateway = PaymentMethodGateway;