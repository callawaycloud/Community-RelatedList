public with sharing class CommunityRelatedListHelper {
    /**
     * @recordId The recordId of the object being viewed (the parent)
     * @objectApiName The API name of the related object
     * @lookupApiName The API name of the lookup field on the related object
     * @fieldApiNames List<String> of field api names
     */
    @AuraEnabled
    public static List<SObject> getRelatedRecords(
        Id recordId,
        String objectApiName,
        String lookupApiName,
        List<String> fieldApiNames
    ) {
        String fieldsQuery = String.join(fieldApiNames, ', ').removeEnd(', ');
        String query = 'SELECT {0} FROM {1} WHERE {2} = {3} WITH SECURITY_ENFORCED';
        List<Object> formattingObjects = new List<Object>{ fieldsQuery, objectApiName, lookupApiName, ':recordId' };
        return Database.query(String.escapeSingleQuotes(String.format(query, formattingObjects)));
    }
}