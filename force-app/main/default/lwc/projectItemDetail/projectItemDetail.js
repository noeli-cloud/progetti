import { LightningElement, track, wire } from 'lwc';
// import getProject from '@salesforce/apex/ProjectController.getProject';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

import { CurrentPageReference } from 'lightning/navigation';


export default class ProjectItemDetail extends LightningElement {


    @track projectId;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('projectselected', this.handleProjectSelected, this);
        alert('max 7.5')
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