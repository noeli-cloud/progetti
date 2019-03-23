import { LightningElement, track, wire } from 'lwc';
import getProjectBenefits from '@salesforce/apex/ProjectController.getProjectBenefits';

import { registerListener, unregisterAllListeners } from 'c/pubsub';

import { CurrentPageReference } from 'lightning/navigation';


export default class ProjectItemDetail extends LightningElement {


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
        alert('max 8.14')
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