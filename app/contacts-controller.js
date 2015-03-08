var ContactsController = (function() {

    function ContactsController(ContactsService) {
        var _this = this;

        ContactsService.getContacts()
            .success(function(contacts) {
                _this.contacts = contacts;
            })
            .error(function() {
                throw new Error("Error getting contacts");
            });
    }
 
    return ContactsController;
})();