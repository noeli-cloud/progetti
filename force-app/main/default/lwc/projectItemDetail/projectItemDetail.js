import { LightningElement, track, wire } from 'lwc';
import getProjectBenefits from '@salesforce/apex/ProjectController.getProjectBenefits';

import { registerListener, unregisterAllListeners } from 'c/pubsub';

import { CurrentPageReference } from 'lightning/navigation';

import updateListView from '@salesforce/apex/ui.force.components.controllers.lists.listViewManagerController.updateListView';


export default class ProjectItemDetail extends LightningElement {

    @wire(updateListView, { "entityKeyPrefixOrApiName": "Progetto__c", "listViewIdOrName": "00B1i000000ZAhBEAW", "label": null, "visibility": null, "displayColumnApiNames": null, "listViewFieldCriteria": [{ "column": "Country__c", "label": "Country", "operator": "EQUALS", "operands": ["Italy"], "dataType": "picklist", "picklistValues": [{ "value": "Argentina", "label": "Argentina" }, { "value": "Brazil", "label": "Brazil" }, { "value": "Chile", "label": "Chile" }, { "value": "Colombia", "label": "Colombia" }, { "value": "Italy", "label": "Italy" }, { "value": "Peru", "label": "Peru" }, { "value": "Portugal", "label": "Portugal" }, { "value": "Russia", "label": "Russia" }, { "value": "Spain", "label": "Spain" }, { "value": "Iberia", "label": "Iberia" }], "supportedOperators": ["EQUALS", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN", "LESS_OR_EQUAL", "GREATER_OR_EQUAL", "CONTAINS", "NOT_CONTAIN", "STARTS_WITH"], "id": 0, "isEditable": true, "entityKeyPrefixOrApiName": "Progetto__c", "hasBeenEdited": true }], "listViewScope": { "apiName": "everything", "label": "All progetti" }, "booleanFilterLogic": "", "shareIds": null })
    updateListView({ data, error }) {
        debugger
        console.log(data,error)
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
        alert('max 9.0')
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