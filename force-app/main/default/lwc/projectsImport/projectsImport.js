import { LightningElement, track, wire } from 'lwc';
import insertRecords from '@salesforce/apex/NC_ProgettiEnel.insertRecords';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class ProjectsImport extends LightningElement {


    insertMethodOptions = [
        { label: "Manual Insert", value: "manual" },
        { label: "Insert from file", value: "auto" }
    ]

    @track saving = false;
    @track strfromJson;
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

    // @wire(insertRecords, { strfromJson: '$strfromJson' })
    // insertRecordsCallback({ data, error }) {
    //     debugger;
    // }

    handleFileChange(event) {
        const input = event.target;

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
        reader.readAsText(input.files[0]);
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

    saveImportMethod() {
        insertRecords({ strfromJson: this.strfromJson, recortypeId: this.recordTypeId })
            .then(result => {
                console.log(result)
                this.closeImportHandler();
            })
            .catch(error => {
                alert(error)
                debugger
            })

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