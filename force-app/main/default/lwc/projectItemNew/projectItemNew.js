import { LightningElement, track } from 'lwc';

export default class ProjectItemNew extends LightningElement {
    
    @track openmodel = false;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    }
    saveMethod() {
        alert('save method invoked');
        this.closeModal();
    }
}