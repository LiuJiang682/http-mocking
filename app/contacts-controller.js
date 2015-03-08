var ContactsController = (function() {

    function ContactsController(ContactsService) {
        var _this = this;

        var request = ContactsService.getContacts();
        request.success(function(contacts) {
            _this.contacts = contacts;
        });

        request.error(function() {
            throw new Error("Error getting contacts");
        });
    }
 
    return ContactsController;
})();