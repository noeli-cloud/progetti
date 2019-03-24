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
        return [SELECT Id, Name,Title__c, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c  ];
    }
    String key = '%' + searchKey + '%';   

    return [SELECT Id, Name,Title__c, Category__c,RecordTypeId,Country__c,OwnerId from Progetto__c WHERE Title__c LIKE :key  ];
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
    
    return [select Id,CODICE_SDG__c from  Beneficio_di_Progetto__c  ];

    }

     @AuraEnabled
    public static void addProgettoBenefit(String ParentId , List<String> lstOfBenefiq){
    list<ProgettoObiettivo__c> lstprojbene = new list<ProgettoObiettivo__c>();
    for(string beneId : lstOfBenefiq){
        ProgettoObiettivo__c obene = new ProgettoObiettivo__c();
        obene.Obiettivo_di_Progetto__c = beneId;
        obene.Progetto__c = ParentId;
        lstprojbene.add(obene);
   }
   upsert lstprojbene;
 }

@AuraEnabled (cacheable=true)
public static List<ProgettoObiettivo__c>  getProjectBenefits(String projectId){
  return [select  Obiettivo_di_Progetto__r.CODICE_SDG__c,Obiettivo_di_Progetto__r.Descrizione__c,
       Obiettivo_di_Progetto__r.PREVALING__c,Obiettivo_di_Progetto__r.Expected_Benefit__c,
       Obiettivo_di_Progetto__r.SECOND_SDG__c,Obiettivo_di_Progetto__r.THIRD_SDG__c,
       Obiettivo_di_Progetto__r.Fourth_SDG__c from ProgettoObiettivo__c where progetto__c =:projectId];
}


@AuraEnabled (cacheable=true)
public static List<Progetto__c>  getCountByCountry(){
  return [SELECT country__c,count(Name) FROM Progetto__c group by country__c];
}


}