public with sharing class projectController {
    public projectController() {

    }

     @AuraEnabled(cacheable=true)
    public static List<Progetto__c> getProject(String prjId) {
        return [SELECT ID_PROGETTO__c, Name, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c where ID_PROGETTO__c  = :prjId];
    }

@AuraEnabled(cacheable=true)
      public static List<Progetto__c> getProjects() {
        return [SELECT ID_PROGETTO__c, Name, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c];
    }
}
