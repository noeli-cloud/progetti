import { LightningElement } from 'lwc';

export default class NcProjectMap extends LightningElement {

    mapMarkers = [
        {
            location: {
                Country: 'Italy',                     
            },

            title: 'Cameroon (2)',
           },
           {
            location: {
                Country: 'Chile',                     
            },

            title: 'Cameroon',
           },
            {
            location: {
                Country: 'Brasil',                     
            },

            title: 'Cameroon',
           },
    ];
}