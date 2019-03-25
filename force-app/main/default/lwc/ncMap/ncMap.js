import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import LEAFTLET_JS from '@salesforce/resourceUrl/leaflet';
import { NavigationMixin } from 'lightning/navigation';


export default class NcMap extends NavigationMixin(LightningElement) {

    renderedCallback() {
        alert("2.18")
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
        var map = L.map(m, { zoomControl: true, zoom: 1 })
            .setView([41.871941, 12.567380], 1)
            // .zoomOut().zoomOut().zoomOut();

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'NoeliCloud © 2019'
            }).addTo(map);

        // Add marker
        const marker = L.marker([41.871941, 12.567380])
        marker.addTo(map)
            .bindPopup('Home of Dreamforce');


        marker.on('mouseover', () => {
            marker.openPopup();
        });

        marker.on('click', (ev) => {
            debugger
            this.navigateToList() // ev is an event object (MouseEvent in this case)
        });

        const marker2 = L.marker([-14.235004, -51.925282])
        marker2.addTo(map)
            .bindPopup('Home of Dreamforce');
        marker2.on('click', (ev) => {
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