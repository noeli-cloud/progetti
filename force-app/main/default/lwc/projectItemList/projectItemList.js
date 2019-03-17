import { LightningElement, track, wire } from 'lwc';
import getProjects from '@salesforce/apex/ProjectController.getProjects';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class ProjectItemList extends LightningElement {


    @wire(CurrentPageReference) pageRef;

    @track searchKey = "";

    @wire(getProjects, { searchKey: '$searchKey' })
    projects;

    itemClick(event) {

        fireEvent(this.pageRef, 'projectselected', event.currentTarget.dataset.projectId);
    }

    search(event) {
        this.searchKey = event.target.value;
    }

}