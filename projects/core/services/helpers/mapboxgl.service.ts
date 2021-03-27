import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { HANDLE_ERROR_REQUEST } from '@core/helpers/functions';

import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { RequestErrorService } from './requestError.service';

@Injectable({
    providedIn: 'root'
})
export class MapBoxGLService {
    mapbox = (mapboxgl as typeof mapboxgl);
    map: mapboxgl.Map;
    style = `mapbox://styles/mapbox/streets-v11`;

    // Coordinates of the location where we want to center the map
    DEFAULT_MAP_CENTER = { latitude: 21.16056, longitude: -86.8475 };
    DEFAULT_MAP_ZOOM = 12;
    latitude = 21.16056;
    longitude = -86.8475;
    zoom = 12;

    private subscriptionMapBoxResult$: Subscription;
    private subscriptionMapBoxResult: Observable<any>;

    constructor(
        private http: HttpClient,
        private requestError: RequestErrorService
        // @Inject('container') private container: string
    ) {
        // We assign the token from the environment variables
        this.mapbox.accessToken = environment.MAPBOX.ACCESS_TOKEN;
    }

    getMapBoxResult(lng: number, lat: number): Observable<any> {
        const apiCoordtoAddress = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.mapbox.accessToken}`;
        const apiCoordtoAddressEncoded = encodeURI(apiCoordtoAddress);
        return this.http.get(apiCoordtoAddressEncoded, { responseType: 'json' }).pipe(catchError(HANDLE_ERROR_REQUEST));
    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: 'mapBoxGL',
            accessToken: this.mapbox.accessToken,
            style: this.style,
            zoom: this.zoom,
            center: [this.longitude, this.latitude],
            trackResize: true,
            maxBounds: [
                -86.9712121848562, 21.0297633301856, // Southwest coordinates
                -86.7405402017646, 21.2130333805118, // Northeast coordinates
            ],
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        // Add map controlss
        const navigate: mapboxgl.NavigationControl = new mapboxgl.NavigationControl();
        const geolocate: mapboxgl.GeolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true }, trackUserLocation: false
        });
        const geocoder: MapboxGeocoder = new MapboxGeocoder({
            mapboxgl: this.map,
            accessToken: this.mapbox.accessToken,
            // localGeocoder: coordinatesGeocoder,
            placeholder: 'Buscar lugares en Cancún',
            countries: 'mx',
            bbox: [-86.9712121848562, 21.0297633301856, -86.7405402017646, 21.2130333805118], // Boundary for Cancun
            proximity: { longitude: -86.8475, latitude: 21.16056 }, // Coordinates of Cancun
            types: 'address, postcode',
            marker: true
        });

        this.map.addControl(geocoder, 'top-left');
        // this.map.addControl(navigate, 'top-right');
        this.map.addControl(geolocate, 'top-left');

        const marker: mapboxgl.Marker = new mapboxgl.Marker({ draggable: true });
        // .setLngLat([-86.8475, 21.16056])
        // .addTo(this.map);

        this.map.on('load', () => {
            const $component = this;
            function getAddress(lng: number, lat: number) {
                const longitude = lng;
                const latitude = lat;
                $component.subscriptionMapBoxResult$ = $component.getMapBoxResult(longitude, lat).subscribe(
                    (response: any) => {
                        // console.log('subscriptionMapBoxResult$', response);
                        const features = response.features;
                        // tslint:disable-next-line: no-shadowed-variable
                        const coordinates = {
                            longitude: response.query[0],
                            latitude: response.query[1]
                        };
                        const place = features[0].place_name;
                        const address = features.find(i => i.id.includes('address')) ? features.find(i => i.id.includes('address')).text : '';
                        const postcode = features.find(i => i.id.includes('postcode')) ? features.find(i => i.id.includes('postcode')).text : '';
                        const city = features.find(i => i.id.includes('place')) ? features.find(i => i.id.includes('place')).text : '';
                        const state = features.find(i => i.id.includes('region')) ? features.find(i => i.id.includes('region')).text : '';
                        const country = features.find(i => i.id.includes('country')) ? features.find(i => i.id.includes('country')).text : '';
                        const countryCode = features.find(i => i.id.includes('country')) ? features.find(i => i.id.includes('country')).properties.short_code : '';

                        // let $geoCoderInput = $("#geocoder .mapboxgl-ctrl-geocoder--input");
                        // $geoCoderInput.val("20814");
                        // $geoCoderInput.keydown();

                        // console.log(response, [ place, address, postcode, city, state, country, countryCode ]);
                        // const deliveryMethod: IDeliveryMethod = { Latitude: coordinates.latitude, Longitude: coordinates.longitude, PlaceName: place, PostCode: postcode };
                        // $component.formOrdering.setValue(deliveryMethod);
                        // $component.formOrdering.updateValueAndValidity({ emitEvent: true, onlySelf: true });
                        // $component.orderingComplete = true;
                        // console.log($component.formOrdering.getRawValue());
                    },
                    error => { console.log('subscriptionMapBoxResult$', error); }
                );
            }

            // this.map.addSource('single-point', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
            // this.map.addLayer({ id: 'point', source: 'single-point', type: 'circle', paint: { 'circle-radius': 10, 'circle-color': '#448ee4' } });

            geolocate.trigger();

            // Listen for the `geocoder.input` event that is triggered when a user
            geolocate.on('geolocate', (ev: any) => {
                const longitude = ev.coords.longitude;
                const latitude = ev.coords.latitude;
                const coords = { coordinates: [-90.32958984375, -0.6344474832838974] };
                getAddress(longitude, latitude);
                // setTimeout(() => { this.orderingComplete = true; }, 3000);
                // this.map.flyTo(
                //   {
                //     // center: [ -74.5 + (Math.random() - 0.5) * 10, 40 + (Math.random() - 0.5) * 10 ],
                //     center: [longitude, latitude],
                //     essential: true // this animation is considered essential with respect to prefers-reduced-motion
                //   }
                // );
                // marker.setLngLat([longitude, latitude]).addTo(this.map);
                // geocoder.query(`Lat: ${latitude}, Lng: ${longitude}`);
                // geocoder.setInput(`${latitude}, ${longitude}`);
                // geocoder.setInput(`Lat: ${latitude}, Lng: ${longitude}`);
                // geocoder.setProximity({ longitude, latitude });
                // geocoder.setFlyTo(coords);
            });

            // this.map.addSource('single-point', {
            //   type: 'geojson',
            //   data: {
            //     type: 'FeatureCollection',
            //     features: []
            //   }
            // });

            geocoder.on('results ', (ev: any) => {
                console.log('results ', [ev.result.geometry, ev, geocoder]);
                // this.map.getSource('single-point').setData(ev.result.geometry);
            });

            geocoder.on('result', (ev: any) => {
                console.log('result', [ev.result.geometry, ev, geocoder]);
                // this.map.getSource('single-point').setData(ev.result.geometry);
            });

            marker.on('dragend', (ev: any) => {
                const lngLat = marker.getLngLat();
                console.log('marker.dragend', ev, marker);
            });
        });

        this.map.on('drag', (ev) => {
            console.log('A drag event occurred.', ev);
        });

        this.map.on('mousemove', (ev) => {
            const currTime = new Date().getTime();
            const K_RECALC_CLIENT_RECT_MS = 50;

            // if (currTime - _this.mouseMoveTime_ > K_RECALC_CLIENT_RECT_MS) {
            //   _this.boundingRect_ = e.currentTarget.getBoundingClientRect();
            // }

            // console.log('A mousemove event has occurred.', [ev, currTime]);
        });

        this.map.on('mousemove', 'poi-label', () => {
            console.log('A mousemove event has occurred on a visible portion of the poi-label layer.');
        });

        this.map.on('mousedown', (ev) => {
            console.log('A mousedown event has occurred.', ev);
        });

        // disable map zoom when using scroll
        // this.map.scrollZoom.disable();

        // disable map rotation using right click + drag
        this.map.dragRotate.disable();

        // disable map rotation using touch rotation gesture
        this.map.touchZoomRotate.disableRotation();
    }

    coordinatesGeocoder = (query) => {
        // console.log('coordinatesGeocoder', query);
        // match anything which looks like a decimal degrees coordinate pair
        const matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
        if (!matches) { return null; }

        // tslint:disable-next-line: no-shadowed-variable
        function coordinateFeature(lng, lat) {
            return {
                center: [lng, lat],
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                // place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                // place_type: ['coordinate'],
                properties: {},
                type: 'Feature'
            };
        }

        const lat = Number(matches[1]);
        const lng = Number(matches[2]);
        const geocodes = [];

        if (geocodes.length === 0) {
            geocodes.push(coordinateFeature(lng, lat));
        }

        return geocodes;
    }
}
