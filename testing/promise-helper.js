var PromiseHelper = (function () {
    function wrapPromise(promise) {
        return {
            then: promise.then,
            success: function (fn) {
                promise.then(fn);
                return wrapPromise(promise);
            },
            error: function (fn) {
                promise.then(null, fn);
                return wrapPromise(promise);
            }
        };
    }

    function PromiseHelper() {
        var _this = this;
        inject(function ($injector) {
            var $q = $injector.get("$q");
            _this._deferred = $q.defer();
            _this.$rootScope = $injector.get("$rootScope");
        });
    }
 
    PromiseHelper.prototype.resolve = function (data) {
        this._deferred.resolve(data);
        this.$rootScope.$apply();
    };
 
    PromiseHelper.prototype.reject = function () {
        this._deferred.reject();
        this.$rootScope.$apply();
    };
 
    PromiseHelper.prototype.getHttpPromiseMock = function () {
        var promise = this.deferred.promise;
        return wrapPromise(promise);
    };
 
    return PromiseHelper;
})();