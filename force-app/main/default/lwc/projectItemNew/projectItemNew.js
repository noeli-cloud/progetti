import { LightningElement, wire, track, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ProjectItemNew extends LightningElement {

    @api recordTypeId;

    objectInfo;
    recordTypeOptions=[];
    @wire(getObjectInfo, { objectApiName: 'Progetto__c' })
    getObjectInfo({ data, error }) {
        if (data) {
            this.objectInfo = data
            this.recordTypeOptions = Object.values(this.objectInfo.recordTypeInfos)
                .filter(r => !r.master).map(r => ({ label: r.name, value: r.recordTypeId }))
        }

    }
    get recordTypeName() {
        let rc = this.recordTypeOptions.find(o => o.value === this.recordTypeId)
        return rc && rc.label || ''
    }



    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: event.detail.apiName + ' created.',
                variant: 'success',
            }),
        );
        this.emitClose()
    }

    emitClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
    handleCancel() {
        this.emitClose()
    }
}