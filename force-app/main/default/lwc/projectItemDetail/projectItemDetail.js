import { LightningElement, track, wire } from 'lwc';
import getProjectBenefits from '@salesforce/apex/ProjectController.getProjectBenefits';

import { registerListener, unregisterAllListeners } from 'c/pubsub';

import { CurrentPageReference } from 'lightning/navigation';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';


export default class ProjectItemDetail extends LightningElement {

    @wire(getObjectInfo,  { objectApiName: 'ListView' })
    getObjectInfo({ data, error }) {
        debugger
        console.log(data,error)
        console.log(getObjectInfo)
    }

    @track projectId;
    @wire(CurrentPageReference) pageRef;
    @track _benefits;
    @wire(getProjectBenefits, { projectId: '$projectId' })
    getProjectBenefits({ data, error }) {
        if (data) {
            this._benefits = data
        }

    }

    connectedCallback() {
        registerListener('projectselected', this.handleProjectSelected, this);
        // alert('max 9.0')
        console.log('max 8.12')
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleProjectSelected(projectId) {
        this.projectId = projectId;
    }

    get mode() {
        return 'view'
    }

}



//SELECT Id, Name, SobjectType FROM ListView where Id='00B1i000000ZAhBEAW'
//SELECT Id, Name, SobjectType FROM ListView where SobjectType='Progetto__c'