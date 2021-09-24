@IsTest
private class CommunityRelatedListHelperTest {
    @IsTest
    private static void getRelatedRecords() {
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;

        Contact testContact = new Contact(
            AccountId = testAccount.Id,
            FirstName = 'Test',
            LastName = 'Contact'
        );
        insert testContact;

        List<String> fieldsToQuery = new List<String> { 'Name', 'Title', 'Birthdate'};

        List<SObject> contacts = CommunityRelatedListHelper.getRelatedRecords(testAccount.Id, 'Contact', 'AccountId', fieldsToQuery);
        System.assertEquals(1, contacts.size(), 'Expected one contact to be returned');
    }
}
