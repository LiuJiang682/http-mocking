var PromiseHelper = (function () {

    function PromiseHelper() {
        this._promise = jasmine.createSpyObj("promise", ["success", "error", "finally", "then"]);
        
        this._promise.error.and.returnValue(this._promise);
        this._promise.success.and.returnValue(this._promise);
        this._promise.finally.and.returnValue(this._promise);
        this._promise.then.and.returnValue(this._promise);
    }

    PromiseHelper.prototype.willResolveWith = function(data) {
        var _this = this;
        this._promise.success.and.callFake(function(callback) {
            callback(data);
            return _this._promise;
        });
    }

    PromiseHelper.prototype.willReject = function() {
        var _this = this;
        this._promise.error.and.callFake(function(callback) {
            callback();
            return _this._promise;
        });
    }

    PromiseHelper.prototype.getHttpPromiseMock = function() {
        return this._promise;
    }
 
    return PromiseHelper;
})();