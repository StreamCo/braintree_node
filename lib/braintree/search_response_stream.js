//@ sourceMappingURL=search_response_stream.map
// Generated by CoffeeScript 1.6.1
var Readable, SearchResponseStream, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

Readable = require('stream').Readable || require('readable-stream').Readable;

SearchResponseStream = (function(_super) {

  __extends(SearchResponseStream, _super);

  function SearchResponseStream(searchResponse) {
    SearchResponseStream.__super__.constructor.call(this, {
      objectMode: true
    });
    this.searchResponse = searchResponse;
    this.currentItem = 0;
    this.currentOffset = 0;
    this.bufferedResults = [];
  }

  SearchResponseStream.prototype.nextItem = function() {
    var index,
      _this = this;
    if (this.searchResponse.fatalError != null) {
      this.emit('error', this.searchResponse.fatalError);
      return this.push(null);
    } else if (this.bufferedResults.length > 0) {
      return this.pushBufferedResults();
    } else if (this.currentItem >= this.searchResponse.ids.length) {
      return this.push(null);
    } else {
      index = 0;
      this.searchResponse.pagingFunction(this.searchResponse.ids.slice(this.currentOffset, this.currentOffset + this.searchResponse.pageSize), function(err, item) {
        if (err != null) {
          _this.emit('error', err);
        } else {
          _this.bufferedResults.push(item);
        }
        _this.currentItem += 1;
        index += 1;
        if (index === _this.searchResponse.pageSize || _this.currentItem === _this.searchResponse.ids.length) {
          return _this.push(_this.bufferedResults.shift());
        }
      });
      return this.currentOffset += this.searchResponse.pageSize;
    }
  };

  SearchResponseStream.prototype.pushBufferedResults = function() {
    var result, _results;
    _results = [];
    while (this.bufferedResults.length > 0) {
      result = this.push(this.bufferedResults.shift());
      if (result === false) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  SearchResponseStream.prototype.ready = function() {
    this.readyToStart = true;
    return this.emit('ready');
  };

  SearchResponseStream.prototype._read = function() {
    var _this = this;
    if (this.readyToStart != null) {
      return this.nextItem();
    } else {
      return this.on('ready', function() {
        return _this.nextItem();
      });
    }
  };

  return SearchResponseStream;

})(Readable);

exports.SearchResponseStream = SearchResponseStream;
