import { LightningElement, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import LEAFTLET_JS from '@salesforce/resourceUrl/leaflet';
import { NavigationMixin } from 'lightning/navigation';
import getCountByCountry from '@salesforce/apex/projectController.getCountByCountry';
import mapData from './mapData'

export default class NcMap extends NavigationMixin(LightningElement) {
    map = null;
    countriesData = [];
    renderedCallback() {
        // alert("3.1")
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
        }).catch(error => {
            debugger;
            this.error = error;
        });
    }

    @wire(getCountByCountry)
    getCountByCountry({ data, error }) {
        if (data) {
            this.countriesData = data.map(({ Country__c, expr0: count }) => ({
                country: Country__c.toLowerCase(),
                title: `${Country__c} (${count} Progetti)`,
            }));
            this.setMarkers()
        }
    }

    initMap() {
        debugger;
        let m = this.template.querySelector('.map');
        this.map = L.map(m, { zoomControl: true, zoom: 1 })
            .setView([41.871941, 12.567380], 1)

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: 'NoeliCloud © 2019'
            }).addTo(this.map);

        this.setMarkers()

    }

    setMarkers() {
        if (this.map && !this.mapHasMarker && this.countriesData.length) {
            this.mapHasMarker = true

            this.countriesData.forEach(({ country, title }) => {
                const countryData = mapData[country]
                if (countryData) {
                    // Add marker                
                    const marker = L.marker([countryData.latitude, countryData.longitude])
                        .addTo(this.map)
                        .bindPopup(title)
                        .on('mouseover', () => {
                            marker.openPopup();
                        })
                        .on('click', () => {
                            this.navigateToList(countryData.filter) // ev is an event object (MouseEvent in this case)
                        })
                }

            })
        }
    }

    navigateToList(filterName) {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Progetto__c',
                actionName: 'list'
            },
            state: {
                filterName
            },
        });
    }
}