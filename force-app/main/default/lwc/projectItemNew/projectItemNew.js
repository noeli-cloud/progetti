import { LightningElement, wire, track, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getBenefits from '@salesforce/apex/projectController.getBenefits';

import addProgettoBenefit from '@salesforce/apex/projectController.addProgettoBenefit';


// import addParentBenefiq from '@salesforce/apex/NC_ProgettiEnel.addParentBenefiq';



export default class ProjectItemNew extends LightningElement {

    @api recordTypeId;
    @track options;
    objectInfo;
    _selectedBenefits;
    recordTypeOptions = [];
    @wire(getBenefits)
    getBenefits({ data, error }) {
        if (data) {
            debugger
            this.options = data.map(d => {
                return {
                    label: d.CODICE_SDG__c,//+ (d.CODICE_SDG__c && d.CODICE_SDG__c),
                    value: d.Id,
                }
            })

        }
    }
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
        addProgettoBenefit({
            ParentId: event.detail.id,
            lstOfBenefiq: this._selectedBenefits
        }).then(() => {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: event.detail.apiName + ' created.',
                    variant: 'success',
                }),
            );
            this.emitClose()
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occurred when saving benefits.',
                    variant: 'error',
                }),
            );
        })
    }

    emitClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
    handleCancel() {
        this.emitClose()
    }
    handleBenefitChange(e) {
        this._selectedBenefits = e.detail.value.map(v => v);
        debugger
    }
}