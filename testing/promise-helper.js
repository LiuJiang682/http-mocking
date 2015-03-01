var PromiseHelper = (function () {
    function PromiseHelper() {
        var _this = this;
        inject(function ($injector) {
            _this.$q = $injector.get("$q");
            _this.$rootScope = $injector.get("$rootScope");
        });
    }
 
    PromiseHelper.prototype.resolve = function () {
        this.$rootScope.$apply();
    };
 
    PromiseHelper.prototype.getHttpPromiseMock = function (data) {
        var deferred = this.$q.defer();
        deferred.resolve(data);
 
        var promise = deferred.promise;
 
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