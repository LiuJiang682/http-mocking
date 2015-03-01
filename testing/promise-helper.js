var PromiseHelper = (function () {
    function PromiseHelper() {
        var _this = this;
        inject(function ($injector) {
            _this.$q = $injector.get("$q");
            _this.$rootScope = $injector.get("$rootScope");
        });
    }
 
    PromiseHelper.prototype.resolve = function (data) {
        this.deferred.resolve(data);
        this.$rootScope.$apply();
    };
 
    PromiseHelper.prototype.reject = function () {
        this.deferred.reject();
        this.$rootScope.$apply();
    };
 
    PromiseHelper.prototype.getHttpPromiseMock = function () {
        this.deferred = this.$q.defer();

        var promise = this.deferred.promise;
 
        return {
            then: promise.then,
            success: function (fn) {
                promise.then(fn);
                return promise;
            },
            error: function (fn) {
                promise.then(null, fn);
                return promise;
            }
        };
    };
 
    return PromiseHelper;
})();