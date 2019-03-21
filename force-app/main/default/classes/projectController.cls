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
        Progetto__c l = [Select Id ,WORKFLOW_STATUS_GLOBAL__c from Progetto__c where Id=:projectId] ; 
        l.WORKFLOW_STATUS_GLOBAL__c =projectStatus ; 
        update l ;
        
    }

     @AuraEnabled (cacheable=true)
    public static List<Beneficio_di_Progetto__c>  getBenefits(){
    
    return [select Name,CODICE_SDG__c from  Beneficio_di_Progetto__c  ];

    }

    public static void addProgettoBenefit(String ParentId , List<String> lstOfBenefiq){
    list<ProgettoObiettivo__c> lstprojbene = new list<ProgettoObiettivo__c>();
    for(string beneId : lstOfBenefiq){
        ProgettoObiettivo__c obene = new ProgettoObiettivo__c();
        obene.Obiettivo_di_Progetto__c = beneId;
        obene.Progetto__c = ParentId;
        lstprojbene.add(obene);
   }
   update lstprojbene;
 }

}