//@ sourceMappingURL=client_token_gateway.map
// Generated by CoffeeScript 1.6.1
var ClientTokenGateway, DEFAULT_VERSION, ErrorResponse, Gateway, exceptions,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gateway = require('./gateway').Gateway;

ErrorResponse = require('./error_response').ErrorResponse;

exceptions = require('./exceptions');

DEFAULT_VERSION = 2;

ClientTokenGateway = (function(_super) {

  __extends(ClientTokenGateway, _super);

  function ClientTokenGateway(gateway) {
    this.gateway = gateway;
  }

  ClientTokenGateway.prototype.generate = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    params.version || (params.version = DEFAULT_VERSION);
    err = this.validateParams(params);
    if (err) {
      return callback(err, null);
    }
    params = {
      client_token: params
    };
    responseHandler = this.responseHandler(callback);
    return this.gateway.http.post("/client_token", params, responseHandler);
  };

  ClientTokenGateway.prototype.validateParams = function(params) {
    var invalidOptions, name, options;
    if (params.customerId || !params.options) {
      return;
    }
    options = ["makeDefault", "verifyCard", "failOnDuplicatePaymentMethod"];
    invalidOptions = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = options.length; _i < _len; _i++) {
        name = options[_i];
        if (params.options[name]) {
          _results.push(name);
        }
      }
      return _results;
    })();
    if (invalidOptions.length > 0) {
      return exceptions.UnexpectedError("Invalid keys: " + invalidOptions.toString());
    } else {
      return null;
    }
  };

  ClientTokenGateway.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err) {
        return callback(err, response);
      }
      if (response.clientToken) {
        response.success = true;
        response.clientToken = response.clientToken.value;
        return callback(null, response);
      } else if (response.apiErrorResponse) {
        return callback(null, new ErrorResponse(response.apiErrorResponse));
      }
    };
  };

  return ClientTokenGateway;

})(Gateway);

exports.ClientTokenGateway = ClientTokenGateway;