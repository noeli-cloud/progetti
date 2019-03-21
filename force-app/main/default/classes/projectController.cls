public with sharing class projectController {
    public projectController() {

    }

    @AuraEnabled(cacheable=true)
    public static Progetto__c getProject(String projectId) {
     return [SELECT Id, Name, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c where Id  = :projectId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Progetto__c> getProjects(String searchKey) {

    if (String.isBlank(searchKey)) {
        return [SELECT Id, Name, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c  ];
    }
    String key = '%' + searchKey + '%';   

    return [SELECT Id, Name, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c WHERE Name LIKE :key  ];
    }

    @AuraEnabled (cacheable=true)
    public static string getRecordTypeName(string objectApiName,string recordTypeId){

    return Schema.getGlobalDescribe().get(objectApiName).getDescribe()
      .getRecordTypeInfosById().get(recordTypeId).getName(); 
    }

    @AuraEnabled (cacheable=true)
    public static string getRecordTypeName2(){

    return Schema.getGlobalDescribe().get('Progetto__c').getDescribe()
     .getRecordTypeInfosById().get('0121i000000CpGzAAK').getName(); 
    }

     @AuraEnabled
    public static void updateStage(String projectStatus , String projectId){
        Lead l = [Select Id ,WORKFLOW_STATUS_GLOBAL__c from Progetto__c where Id=:projectId] ; 
        l.WORKFLOW_STATUS_GLOBAL__c =projectStatus ; 
        update l ;
        
    }
}