import { LightningElement, track, api, wire } from 'lwc';
import insertRecords from '@salesforce/apex/NC_ProgettiEnel.insertRecords';
// import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProjectsImport extends LightningElement {

    // @api recordTypeId;


    @track fileName;
    @track strfromJson;

    objectInfo;
    // recordTypeOptions=[];

    // @wire(getObjectInfo, { objectApiName: 'Progetto__c' })
    // getObjectInfo({ data, error }) {
    //     if (data) {
    //         this.objectInfo = data
    //         this.recordTypeOptions = Object.values(this.objectInfo.recordTypeInfos)
    //             .filter(r => !r.master).map(r => ({ label: r.name, value: r.recordTypeId }))
    //     }

    // }

    constructor(...arg){
        super(...arg)
        // alert('im 2.2')
    }

    handleFileChange(event) {
        const input = event.target;
        const file = input.files[0]
        this.fileName = file.name;
        debugger
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            console.log(text)
            let data;
            try {
                data = JSON.parse(text)
            } catch (e) {
                data = this.csvToObject(text)
            }
            data = data.filter(obj => Object.keys(obj).reduce((filter, prop) => filter || obj[prop], false))
            console.log(data)
            this.strfromJson = JSON.stringify(data)

        };
        reader.readAsText(file);
    }

    csvToObject(csv) {
        if (csv) {
            let rows = csv.split(/\n/)
            let headers = rows[0].split(/,|\t/)
            rows.shift()
            let data = rows.map(r => {
                let rowAsArray = r.split(/,|\t/)
                return headers.reduce((rowAsObject, col, index) => {
                    return { ...rowAsObject, [trimQuote(col)]: trimQuote(rowAsArray[index]) }
                }, {})
            })
            return data;
        }
        function trimQuote(text) {
            return text && text.replace(/^"|"$/g, '')
        }
    }


    saveImportMethod() {
        insertRecords({ strfromJson: this.strfromJson/*, recortypeId: this.recordTypeId */ })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Projects Imported.',
                        variant: 'success',
                    }),
                );
                this.emitClose()
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An Error Occurred when importing.',
                        variant: 'error',
                    }),
                );
            })

    }

    // get recordTypeName() {
    //     let rc = this.recordTypeOptions.find(o => o.value === this.recordTypeId)
    //     return rc && rc.label || ''
    // }

    emitClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
    handleCancel() {
        this.emitClose()
    }
}