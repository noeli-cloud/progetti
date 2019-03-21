import { LightningElement, wire, api/*, track*/ } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
// import ACCOUNT_OBJECT from '@salesforce/schema/Progetto__c';
import getRecordTypeName from '@salesforce/apex/projectController.getRecordTypeName';


export default class ProjectItem extends LightningElement {

    @api project;
    @api Selected;
    @wire(getObjectInfo, { objectApiName: 'Progetto__c' })
    objectInfo;

    @wire(getRecordTypeName, { objectApiName: 'Progetto__c', recordTypeId: '$recordTypeId' }) recordTypeNameResult;

    click() {
        debugger
        console.log(this.recordTypeNameResult)
    }

    get recordTypeName() {
        return this.recordTypeNameResult && this.recordTypeNameResult.data
    }

    get recordTypeId() {
        return this.project && this.project.recordTypeId
    }
    get selectedStyle() {
        if (this.Selected === (this.project && this.project.Id)) {
            return "background-color: #dad4d447;"
        }
        return ''
    }
    // get recordTypeId() {
    //     debugger;
    //     // console.log(ACCOUNT_OBJECT)
    //     if(!this.objectInfo)return this.project.recordTypeId
    //     // Returns a map of record type Ids 
    //     const rtis = this.objectInfo.data.recordTypeInfos;

    //     for (let id in rtis) {
    //         if (id === this.project.recordTypeId) {
    //             return rtis[id].name
    //         }
    //     }

    // }

}