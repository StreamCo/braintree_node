//@ sourceMappingURL=validation_error.map
// Generated by CoffeeScript 1.6.1
var ValidationError;

ValidationError = (function() {

  function ValidationError(error) {
    this.attribute = error.attribute;
    this.code = error.code;
    this.message = error.message;
  }

  return ValidationError;

})();

exports.ValidationError = ValidationError;
