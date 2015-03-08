describe("ContactsController tests", function() {

    var contacts,
        promiseHelper;
 
    beforeEach(function () {
        // Test data
        contacts = [];
        for (var i = 0; i < 100; i++) {
            contacts.push({
                id: i,
                name: "Contact " + i
            });
        }
     
        // Promise helper
        promiseHelper = new PromiseHelper();
    });

    it("Contact list matches companies from the data store", function () {
        // Arrange
        var contactsServiceMock = jasmine.createSpyObj(
            "ContactsService", ["getContacts"]);

        contactsServiceMock.getContacts.and.returnValue(
            promiseHelper.getHttpPromiseMock());

        promiseHelper.willResolveWith(contacts);
     
        // Act
        var ctrl = new ContactsController(contactsServiceMock);
     
        // Assert
        expect(ctrl.contacts).toBeDefined();
        expect(ctrl.contacts).toBe(contacts);
     
        expect(contactsServiceMock.getContacts).toHaveBeenCalled();
    });

    it("Throws error when getContacts fails.", function () {
        // Arrange
        var contactsServiceMock = jasmine.createSpyObj(
            "ContactsService", ["getContacts"]);

        contactsServiceMock.getContacts.and.returnValue(
            promiseHelper.getHttpPromiseMock());
        
        promiseHelper.willReject();
        
        // Act
        var ctrl;
        expect(function() {     
            ctrl = new ContactsController(contactsServiceMock);
        }).toThrow();
     
        // Assert
        expect(ctrl).not.toBeDefined();
     
        expect(contactsServiceMock.getContacts).toHaveBeenCalled();
    });
});