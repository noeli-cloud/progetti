import { LightningElement, wire } from 'lwc';
import getProjects from '@salesforce/apex/ProjectController.getProjects';

export default class ProjectItemList extends LightningElement {

    @wire(getProjects) projects;
    itemClick(event) {
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Create a custom event that bubbles. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        const selectEvent = new CustomEvent('projectselected', {
            detail: { projectId: event.currentTarget.dataset.projectId }
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    }
}