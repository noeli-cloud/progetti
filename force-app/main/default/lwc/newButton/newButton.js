import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class NewButton extends LightningElement {


    insertMethodOptions = [
        { label: "Manual Insert", value: "manual" },
        { label: "Insert from file", value: "auto" }
    ]
    recordTypeOptions;

    @track recordTypeId;
    @track insertMethod;

    @track objectInfo;
    @wire(getObjectInfo, { objectApiName: 'Progetto__c' })
    getObjectInfo({ data, error }) {
        if (data) {
            this.objectInfo = data
            this.recordTypeOptions = Object.values(this.objectInfo.recordTypeInfos)
                .filter(r => !r.master).map(r => ({ label: r.name, value: r.recordTypeId }))
        }

    }

   

    @track openSelectRecordTypeModal = false;
    @track openSelectInsertMethodModal = false;
    @track openImportModal = false
    @track openNewProjectModal = false

    openSelectRecordTypeModalHandler() {
        this.openSelectRecordTypeModal = true
    }

    closeSelectRecordTypeModalHandler() {
        this.openSelectRecordTypeModal = false
    }
    openSelectInsertMethodModalHandler() {
        this.closeSelectRecordTypeModalHandler()
        this.openSelectInsertMethodModal = true
    }
    closeSelectInsertMethodModalHandler() {
        this.openSelectInsertMethodModal = false
    }
    openNewOrImportHandler() {
        this.closeSelectInsertMethodModalHandler()
        if (this.insertMethod === 'manual') {
            this.openNewHandler()
        } else {
            this.openImportHandler()
        }
    }

    openNewHandler() {
        this.openNewProjectModal = true
    }
    closeNewHandler() {
        this.openNewProjectModal = false
    }
    openImportHandler() {
        this.openImportModal = true
    }
    closeImportHandler() {
        this.openImportModal = false
    }


    recordTypeSelected(event) {
        this.recordTypeId = event.currentTarget.value
    }
    insertMethodSelected(event) {
        this.insertMethod = event.currentTarget.value
    }

    get recordTypeName() {
        let rc = this.recordTypeOptions.find(o => o.value === this.recordTypeId)
        return rc && rc.label || ''
    }
  
    
}