var ContactsService = (function() {
    function ContactsService($http) {
        this.$http = $http;
    }
 
    ContactsService.prototype.getContacts = function() {
        return this.$http.get("/api/contacts");
    };
 
    return ContactsService;
})();