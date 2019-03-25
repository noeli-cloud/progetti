import { LightningElement, wire, track } from 'lwc';
import getCountByCountry from '@salesforce/apex/ProjectController.getCountByCountry';



export default class NcProjectMap extends LightningElement {

    @track
    mapMarkers = [];

    // constructor(...arg) {
    //     super(...arg)
    //     // alert('map 1.10')
    // }

    connectedCallback() {

    }

    @wire(getCountByCountry)
    getCountByCountry({ data, error }) {
        if (data) {
            this.mapMarkers = data.map(({ Country__c, expr0: count }) => ({
                location: {
                    Country: Country__c,
                },

                title: `${Country__c} (${count})`,
                description1: ``
            }));
        }
    }


}