import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import LEAFTLET_JS from '@salesforce/resourceUrl/leaflet';
import { NavigationMixin } from 'lightning/navigation';


export default class NcMap extends NavigationMixin(LightningElement) {

    renderedCallback() {
        alert("2.9")
        debugger
        if (this.leaftletjsInitialized) {
            return;
        }
        this.leaftletjsInitialized = true;

        Promise.all([
            loadScript(this, LEAFTLET_JS + '/leaflet.js'),
            loadStyle(this, LEAFTLET_JS + '/leaflet.css')
        ]).then(() => {
            this.initMap();
        })
            .catch(error => {
                debugger;
                this.error = error;
            });
    }
    initMap() {
        debugger;
        let m = this.template.querySelector('.map');
        var map = L.map(m, { zoomControl: false }).setView([37.784173, -122.401557], 14);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'NoeliCloud © 2019'
            }).addTo(map);

        // Add marker
        const marker = L.marker([37.784173, -122.401557])
        marker.addTo(map)
            .bindPopup('Home of Dreamforce');
        marker.on('click', (ev) => {
            debugger
            this.navigateToList() // ev is an event object (MouseEvent in this case)
        });
    }
    navigateToList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Progetto__c',
                actionName: 'list'
            },
            state: {
                filterName: '00B1i000000ZPJ8EAO'
            },
        });
    }
}