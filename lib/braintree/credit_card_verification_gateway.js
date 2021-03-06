//@ sourceMappingURL=credit_card_verification_gateway.map
// Generated by CoffeeScript 1.6.1
var CreditCardVerification, CreditCardVerificationGateway, CreditCardVerificationSearch, Gateway, exceptions, util, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gateway = require('./gateway').Gateway;

CreditCardVerification = require('./credit_card_verification').CreditCardVerification;

CreditCardVerificationSearch = require('./credit_card_verification_search').CreditCardVerificationSearch;

util = require('util');

_ = require('underscore');

exceptions = require('./exceptions');

CreditCardVerificationGateway = (function(_super) {

  __extends(CreditCardVerificationGateway, _super);

  function CreditCardVerificationGateway(gateway) {
    this.gateway = gateway;
  }

  CreditCardVerificationGateway.prototype.find = function(creditCardVerificationId, callback) {
    if (creditCardVerificationId.trim() === '') {
      return callback(exceptions.NotFoundError("Not Found"), null);
    } else {
      return this.gateway.http.get("/verifications/" + creditCardVerificationId, function(err, response) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, new CreditCardVerification(response.verification));
        }
      });
    }
  };

  CreditCardVerificationGateway.prototype.search = function(fn, callback) {
    var search;
    search = new CreditCardVerificationSearch();
    fn(search);
    return this.createSearchResponse("/verifications/advanced_search_ids", search, this.pagingFunctionGenerator(search), callback);
  };

  CreditCardVerificationGateway.prototype.responseHandler = function(callback) {
    return this.createResponseHandler("creditCardVerification", CreditCardVerification, callback);
  };

  CreditCardVerificationGateway.prototype.pagingFunctionGenerator = function(search) {
    var _this = this;
    return function(ids, callback) {
      var searchCriteria;
      searchCriteria = search.toHash();
      searchCriteria["ids"] = ids;
      return _this.gateway.http.post("/verifications/advanced_search", {
        search: searchCriteria
      }, function(err, response) {
        var creditCardVerification, _i, _len, _ref, _results;
        if (err) {
          return callback(err, null);
        } else {
          if (_.isArray(response.creditCardVerifications.verification)) {
            _ref = response.creditCardVerifications.verification;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              creditCardVerification = _ref[_i];
              _results.push(callback(null, new CreditCardVerification(creditCardVerification)));
            }
            return _results;
          } else {
            return callback(null, new CreditCardVerification(response.creditCardVerifications.verification));
          }
        }
      });
    };
  };

  return CreditCardVerificationGateway;

})(Gateway);

exports.CreditCardVerificationGateway = CreditCardVerificationGateway;
