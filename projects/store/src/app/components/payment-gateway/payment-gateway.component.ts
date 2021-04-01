import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, Type, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';

import { environment } from 'projects/environments/environment';
import { TranslateService } from '@ngx-translate/core';

// #region MAPS
  //#region MAPBOX GL
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapBoxGLService } from '@core/services/helpers/mapboxgl.service';
import { Map, Marker, GeolocateControl, NavigationControl, MapboxEvent, EventData, LngLatLike, LngLat } from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { ControlComponent, MapComponent, Position } from 'ngx-mapbox-gl';
  //#endregion

  //#region LEAFLET
// import { Map, Layer, Control, Marker, circle, latLng, tileLayer, marker, point, control, polygon, polyline, MapOptions,
// LatLngTuple } from 'leaflet';
// import { LeafletControlLayersConfig, LeafletDirective, LeafletLayerDirective } from '@asymmetrik/ngx-leaflet';
// import { NgxLeafletLocateComponent } from '@runette/ngx-leaflet-locate';
// import { * } from 'leaflet.locatecontrol';
  //#endregion
//#endregion

//
import {
  IDeliveryContact, IDeliveryMethod, IDeliveryTime, IDeliveryPaymentMethod,
  DeliveryContact, DeliveryMethod, DeliveryTime, DeliveryPaymentMethod, PaymentMethodEnum
} from 'projects/core/models/shopcart';
import { DatePipe } from '@angular/common';

import { ValidationService } from 'projects/core/directives/formly/validation/validation.service';

import { PaymentGatewayService } from '../../../../../core/services/payment/payment-gateway.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { GeolocateControlDirective } from 'ngx-mapbox-gl/lib/control/geolocate-control.directive';
import { GeocoderControlDirective } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MarkerComponent } from 'ngx-mapbox-gl/lib/marker/marker.component';

// Before the component
declare var Stripe: any;
const DEFAULT_MAP_CENTER = { latitude: 21.16056, longitude: -86.8475 };
const DEFAULT_MAP_ZOOM = 12;

export enum StepsPaymentGateway { None = 0, Contact = 1, Ordering = 2, Time = 3, Payment = 4 }

const DEBUG = true;

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [ { provide: 'container', useValue: 'mapboxGL'  } ]
})
export class PaymentGatewayComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    private datePipe: DatePipe,

    private stripeService: StripeService,
    private mapboxglService: MapBoxGLService,
    private paymentGatewayService: PaymentGatewayService
  ) { }
  
  @Output() stepCompleteRequest = new EventEmitter<boolean>();

  public DateCurrent: number = Date.now();

  private MAPBOX_ACCESS_TOKEN = environment.MAPBOX.ACCESS_TOKEN;

  public CurrentStep: StepsPaymentGateway = StepsPaymentGateway.None;

  //#region FORM STEPS
  @ViewChild('cardErrors') cardErrors: ElementRef<HTMLDivElement>;

  public contactComplete = false;
  public formContact: FormGroup = new FormGroup({});
  public modelContact: DeliveryContact = null;
  public optionsContact: FormlyFormOptions = {}; // { formState: { awesomeIsForced: true, } };
  public fieldsContact: FormlyFieldConfig[] = [];

  public orderingComplete = false;
  public formOrdering = new FormGroup({});
  public modelOrdering: DeliveryMethod = null;
  public optionsOrdering: FormlyFormOptions = {};
  public fieldsOrdering: FormlyFieldConfig[] = [];

  public timeComplete = false;
  public formTime = new FormGroup({});
  public modelTime: DeliveryTime = null;
  public optionsTime: FormlyFormOptions = {};
  public fieldsTime: FormlyFieldConfig[] = [];

  public paymentComplete = false;
  public formPayment = new FormGroup({});
  public modelPayment: DeliveryPaymentMethod = null;
  public optionsPayment: FormlyFormOptions = {};
  public fieldsPayment: FormlyFieldConfig[] = [];
  //#endregion

  //#region STRIPE ELEMENTS
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  public elementsOptions: StripeElementsOptions = { locale: 'es' };
  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '12px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };
  //#endregion

  //#region MAPBOX VARIABLES
  @ViewChild('mapbox') mapboxMap!: MapComponent;
  @ViewChild('marker') mapboxMarker!: MarkerComponent;
  @ViewChild('geolocate') mapboxGeolocate!: ControlComponent<GeolocateControl>;
  @ViewChild('geocoder') mapboxGeocoder!: ControlComponent<MapboxGeocoder>; // GeocoderControlDirective MapboxGeocoder
  mapbox = (mapboxgl as typeof mapboxgl);
  private mapboxLocations: boolean = false;
  public mapboxHighAccuracy: boolean = false;
  public mapboxShowUserLocate: boolean = true;
  public mapboxTrackUserLocate: boolean = true;
  public mapboxGL: mapboxgl.Map; // Map;
  public mapboxMarkerCenter: LngLatLike = [0 , 0];
  public mapboxCenter = [-86.8475, 21.16056];
  public mapboxBounds: [
    -86.9712121848562, 21.0297633301856, // Southwest coordinates
    -86.7405402017646, 21.2130333805118, // Northeast coordinates
  ];
  private subscriptionMapBoxResult$: Subscription;
  private subscriptionMapBoxResult: Observable<any>;
  //#endregion

  public modelOrderinWithMapBox = {
    ...this.modelOrdering,
    mapboxHighAccuracy: this.mapboxHighAccuracy,
    mapboxShowUserLocate: this.mapboxShowUserLocate,
    mapboxTrackUserLocate: this.mapboxTrackUserLocate,
  };
  private getMapBoxResult(lng: number, lat: number, token: string = this.MAPBOX_ACCESS_TOKEN): Observable<any> {
    const apiCoordtoAddress = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`;
    const apiCoordtoAddressEncoded = encodeURI(apiCoordtoAddress);
    return this.http.get(apiCoordtoAddressEncoded, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  ngOnInit(): void {
    // console.log('PaymentGatewayComponent.ngOnInit: ', this);

    this.modelContact = new DeliveryContact();
    this.fieldsContact = [
      {
        fieldGroupClassName: 'flex flex-wrap content-start',
        fieldGroup: [
          {
            key: 'firstname', type: 'input', defaultValue: 'Jonatan', className: 'w-1/2 mb-5',
            templateOptions: { placeholder: 'SHOPCART.FORMS.Step1.lblFisrtName', inputClass: 'form-control-sm', required: true, translate: true, attributes: { autocomplete: 'new_firstname' } },
            validation: { show: true, },
          },
          {
            key: 'lastname', type: 'input', defaultValue: 'Alcocer Zamora', className: 'w-1/2 mb-5',
            templateOptions: { placeholder: 'SHOPCART.FORMS.Step1.lblLastName', inputClass: 'form-control-sm', required: true, translate: true, attributes: { autocomplete: 'new_firstname' } },
            validation: { show: true, },
          },
          {
            key: 'cellphone', type: 'tel', defaultValue: '9191309422', className: 'w-2/3 mb-5 relative',
            templateOptions: { placeholder: 'SHOPCART.FORMS.Step1.lblCellPhone', inputClass: 'form-control-sm', addonLeft: { icon: 'mobile-alt', }, required: true, translate: true, attributes: { autocomplete: 'new_firstname' } },
            validation: { show: true, messages: { pattern: (error, field: FormlyFieldConfig) => this.translate.stream('FORM.VALIDATION.TEL', { value: field.formControl.value }), }, },
          },
          {
            key: 'country', type: 'input', className: 'w-1/3 mb-5 relative',
            templateOptions: { placeholder: 'SHOPCART.FORMS.Step1.lblCountry', inputDatalist: 'countries', inputClass: 'form-control-sm', addonLeft: { icon: 'globe', }, required: false, translate: true, attributes: { autocomplete: 'new_firstname' } },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                const query = (search: string, token: string = this.MAPBOX_ACCESS_TOKEN): Observable<any> => {
                  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?types=country&access_token=${token}`;
                  const apiUrlEncoded = encodeURI(apiUrl);
                  return this.http.get(apiUrlEncoded, { responseType: 'json' }).pipe(catchError(this.handleError));
                };

                const fieldControl = field.form.get('country');

                // tslint:disable-next-line: deprecation
                fieldControl.valueChanges.subscribe({
                  next: (value) => {
                    console.groupCollapsed('hooks.onInit.next');
                    const dataListControl: HTMLDataListElement = document.querySelector(`[id="${field.templateOptions.inputDatalist}"]`);
                    if (value && !dataListControl.querySelector(`option[value*="${value}"]`)) {
                      query(value).toPromise().then((response) => {
                        const countries = response.features;
                        if (countries && countries.length > 0) {
                          dataListControl.querySelectorAll('option').forEach(i => i.remove());
                          countries.forEach((country: { place_name: string; }) => {
                            const option = document.createElement('option');
                            option.value = country.place_name;
                            dataListControl.appendChild(option);
                          });
                        }
                      });
                    }
                    console.groupEnd();
                  },
                  error: (err) => {
                    console.groupCollapsed('hooks.onInit.error');
                    console.log(err);
                    console.groupEnd();
                  }
                });

                // const geocoder = new MapboxGeocoder( { accessToken: environment.MAPBOX.ACCESS_TOKEN, types: 'country,region,place,postcode,locality,neighborhood' });
                // geocoder.addTo(`#${field.id}`);
                // console.log(field);
              },
            },
          },
          {
            key: 'email', type: 'email', defaultValue: 'jalcocerzamora@gmail.com', className: 'w-full mb-5 relative',
            templateOptions: { placeholder: 'SHOPCART.FORMS.Step1.lblEmail', inputClass: 'form-control-sm', addonLeft: { icon: 'envelope', }, required: true, translate: true, attributes: { autocomplete: 'new_firstname' } },
            validation: { show: true, messages: { pattern: (error, field: FormlyFieldConfig) => this.translate.stream('FORM.VALIDATION.EMAIL', { value: field.formControl.value }), }, },
            validators: Validators.compose([Validators.required, ValidationService.emailValidator]),
          },
        ]
      },
    ];

    this.modelOrdering = new DeliveryMethod();
    this.fieldsOrdering = [
      {
        fieldGroupClassName: 'flex space-x-1',
        fieldGroup: [
          {
            key: 'PlaceName', type: 'input', className: 'w-full w-1/2', hide: false,
            templateOptions: { placeholder: 'PlaceName', required: true, inputClass: 'form-control-sm' },
            validation: { show: true, },
          },
          {
            key: 'PostCode', type: 'input', className: 'w-full w-1/2', hide: false,
            templateOptions: { placeholder: 'PostCode', required: true, inputClass: 'form-control-sm' },
            validation: { show: true, },
          },
        ]
      },
      {
        fieldGroupClassName: 'flex space-x-1',
        fieldGroup: [
          {
            key: 'Latitude', type: 'input', className: 'w-full w-2/6', hide: false,
            templateOptions: { placeholder: 'Latitude', required: true, inputClass: 'form-control-sm' },
            validation: { show: true, },
          },
          {
            key: 'Longitude', type: 'input', className: 'w-full w-4/6', hide: false,
            templateOptions: { placeholder: 'Longitude', required: true, inputClass: 'form-control-sm' },
            validation: { show: true, },
          },
        ]
      },
    ];

    this.modelTime = new DeliveryTime();
    const currentDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    const currentTime = this.datePipe.transform(Date.now(), 'HH:mm');
    this.fieldsTime = [
      {
        fieldGroupClassName: 'flex flex-row justify-aroundx space-x-1 mb-5',
        fieldGroup: [
          {
            className: 'w-3/12',
            fieldGroupClassName: 'flex-0',
            fieldGroup: [
              {
                key: 'Method', type: 'radio', className: '', defaultValue: 1,
                templateOptions: { placeholder: 'Method', required: true, options: [{ value: 1, label: 'Ahora' }, { value: 2, label: 'Fijado' }] /*description: 'Pidelo ahora mismo o programalo.',*/ },
                validation: { show: true, },
                expressionProperties: {
                  defaultValue: (model, formState) => {
                    if (model.Method === 1) {
                      model.Date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
                      model.Schedule = this.datePipe.transform(Date.now(), 'HH:mm');
                    }
                  },
                },
              }
            ]
          },
          {
            className: 'w-9/12',
            fieldGroupClassName: 'flex-1 flex flex-row',
            fieldGroup: [
              {
                key: 'Date', type: 'input', defaultValue: currentDate, className: 'w-1/2 mr-1', hide: true,
                templateOptions: { type: 'date', placeholder: 'Date', required: true, inputClass: 'form-control-sm date enchilada' },
                validators: { /* validation: ['date-future']*/ }, validation: { show: true, },
                hideExpression: '!model.Method || model.Method === 1',
              },
              {
                key: 'Schedule', type: 'input', defaultValue: currentTime, className: 'w-1/2', hide: true,
                templateOptions: { type: 'time', placeholder: 'Schedule', required: true, inputClass: 'form-control-sm date enchilada' },
                validators: { /* validation: ['date-future']*/ }, validation: { show: true, },
                hideExpression: '!model.Method || model.Method === 1'
              },
            ]
          },
        ]
      },
    ];

    this.modelPayment = new DeliveryPaymentMethod();
    this.fieldsPayment = [
      {
        fieldGroupClassName: 'flex flex-row justify-aroundx space-x-1',
        fieldGroup: [
          {
            key: 'Method', type: 'radio', className: 'mb-5', fieldGroupClassName: 'mb-5',
            templateOptions: {
              placeholder: 'Method', inputClass: 'form-control-sm', required: true,
              options: [{ value: 0, label: 'En la entrega' }, { value: 1, label: 'Tarjeta de debito/credito' }],
            },
            hooks: {
              onInit: (field) => {
                return field.formControl.valueChanges.pipe(tap((value: PaymentMethodEnum) => {
                  let validBrand = false;
                  if (value !== PaymentMethodEnum.Cash) {
                    this.paymentGatewayService.setCardStripe = this.card;
                  } else {
                    this.paymentGatewayService.setCardStripe = null;
                    this.formPayment.controls.Brand.reset();
                    validBrand = (value === PaymentMethodEnum.Cash || this.modelPayment.hasOwnProperty('Brand') ? true : false);
                  }
                  const fullStatus = (this.formContact.valid && this.formOrdering.valid && this.formTime.valid && this.formPayment.valid && validBrand);
                  this.stepCompleteRequest.emit(fullStatus);
                  console.log(this.formPayment.controls);
                }));
              },
            },
            validation: { show: true, },
          },
        ]
      },
      {
        fieldGroupClassName: 'flex flex-row justify-aroundx space-x-1',
        fieldGroup: [
          // {
          //   key: 'CardHolder', type: 'input', model: this.modelContact.FirstName, className: 'flex-grow mt-5 mb-5 mr-1', hide: false,
          //   templateOptions: { required: true, inputClass: 'form-control-sm', },
          //   validation: { show: true, },
          //   hideExpression: '!model.Method || model.Method === 0'
          // }
          {
            key: 'Brand', type: 'input', className: 'hidden flex-grow mb-5 mr-1', hide: false,
            templateOptions: { inputClass: 'form-control-sm', required: false },
            validation: { show: true, },
            expressionProperties: {
              // 'templateOptions.required': '!model.Method',
              // 'templateOptions.disabled': '!model.Method',
            },
          },
          {
            key: 'CardNumber', type: 'input', className: 'hidden flex-grow mb-5 mr-1', hide: true,
            templateOptions: { inputClass: 'form-control-sm', },
            validation: { show: true, },
            expressionProperties: { 'templateOptions.required': '!!model.Method', },
          },
          {
            key: 'CardExpiry', type: 'input', className: 'hidden flex-grow mb-5 mr-1', hide: true,
            templateOptions: { inputClass: 'form-control-sm', },
            validation: { show: true, },
            expressionProperties: { 'templateOptions.required': '!!model.Method', },
          },
          {
            key: 'CardCvc', type: 'input', className: 'hidden flex-grow mb-5 mr-1', hide: true,
            templateOptions: { inputClass: 'form-control-sm', },
            validation: { show: true, },
            expressionProperties: { 'templateOptions.required': '!!model.Method', },
          },
        ]
      }
    ];

    // this.GenerateMapBox();
    // this.mapboxglService.buildMap();
    // this.GenerateMapLeaflet();

    setTimeout(() => {
      this.onSubmitContact();
      this.onSubmitOrdering();
      this.onSubmitTime();
    }, 3000);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    if (this.subscriptionMapBoxResult$) { this.subscriptionMapBoxResult$.unsubscribe(); }
    // this.mapLeflet.stopLocate();
  }

  ngAfterViewInit() {
    // console.log(this.mapboxGeolacateDirective);
  }

  //#region Submits Forms
  onSubmitContact() {
    // this.submitted = true;

    if (this.formContact.invalid) { return; }

    // this.loading = true;
    this.contactComplete = true;
    this.CurrentStep = StepsPaymentGateway.None;
    const fullStatus = (this.formContact.valid && this.formOrdering.valid && this.formTime.valid && this.formPayment.valid);
    this.stepCompleteRequest.emit(fullStatus);
  }

  onSubmitOrdering() {
    // this.submitted = true;

    if (this.formOrdering.invalid) { return; }

    // this.loading = true;
    this.orderingComplete = true;
    this.CurrentStep = StepsPaymentGateway.None;
    const fullStatus = (this.formContact.valid && this.formOrdering.valid && this.formTime.valid && this.formPayment.valid);
    this.stepCompleteRequest.emit(fullStatus);
  }

  onSubmitTime() {
    // this.submitted = true;

    if (this.formTime.invalid) { return; }

    // this.loading = true;
    this.timeComplete = true;
    this.CurrentStep = StepsPaymentGateway.None;
    const fullStatus = (this.formContact.valid && this.formOrdering.valid && this.formTime.valid && this.formPayment.valid);
    this.stepCompleteRequest.emit(fullStatus);
  }

  onSubmitPayment() {
    // this.submitted = true;

    if (this.formPayment.invalid) { return; }

    // this.loading = true;
    this.paymentComplete = true;
    this.CurrentStep = StepsPaymentGateway.None;
    // this.servicePaymentGateway.payWithCard();
  }

  onChangeStripe(event: StripeCardElementChangeEvent) {
    let fullStatus = false;
    if (!event.complete) {
      if (event.error) {
        this.cardErrors.nativeElement.textContent = event.error.message;
        this.cardErrors.nativeElement.classList.add('visible');
        this.formPayment.controls.Brand.reset();
        fullStatus = (this.formContact.valid && this.formOrdering.valid && this.formTime.valid && this.formPayment.valid);
      }
      fullStatus = false;
    } else {
      this.cardErrors.nativeElement.textContent = '';
      this.cardErrors.nativeElement.classList.remove('visible');
      this.formPayment.controls.Brand.setValue(event.brand);
      fullStatus = (this.formContact.valid && this.formOrdering.valid && this.formTime.valid && this.formPayment.valid);
    }
    this.stepCompleteRequest.emit(fullStatus);

    console.log('PaymentGatewayComponent.onChangeStripe', event, this.formPayment.controls);
    // Re-enable the Pay button.
    // $submitButton.disabled = false;
  }
  //#endregion

  //#region LEFTLET METHOD
  // onLeafletMapReady(mapLeaflet: Map) {
  //   this.mapLeflet = mapLeaflet;
  //   const $component = this;
  //   console.groupCollapsed('onLeafletMapReady');
  //   console.groupEnd();
  //   mapLeaflet.fitBounds(this.route.getBounds(), {
  //     padding: point(24, 24),
  //     maxZoom: 12,
  //     animate: true
  //   });

  //   mapLeaflet.locate({ watch: true, setView: true, maxZoom: DEFAULT_MAP_ZOOM + 10, enableHighAccuracy: true });
  //   mapLeaflet.on('locationfound', (e) => {
  //     console.groupCollapsed('onLeafletMapReady.locationfound');
  //     const radius = e.accuracy;
  //     // this.leafletLayers.push(marker(e.latlng).bindPopup('You are within ' + radius + ' meters <from this point').openPopup());
  //     //   this.leafletLayers.push(circle(e.latlng, radius));
  //     const deliveryMethod: IDeliveryMethod = { Latitude: e.latlng.lat, Longitude: e.latlng.lng, PlaceName: 'Testing', PostCode: 1 };
  //     $component.formOrdering.setValue(deliveryMethod);
  //     $component.formOrdering.updateValueAndValidity({ emitEvent: true, onlySelf: true });
  //     $component.orderingComplete = true;
  //     console.log('e', e);
  //     console.log('LeafletMap', [this.LeafletMap, marker(e.latlng)]);
  //     console.groupEnd();
  //   });
  //   mapLeaflet.on('locationerror', (e) => {
  //     console.groupCollapsed('onLeafletMapReady.locationerror');
  //     console.log(e);
  //     console.groupEnd();
  //   });
  // }

  // onNewLocation(e: Location) {
  //   console.groupCollapsed('onNewLocation');
  //   console.log({e});
  //   console.groupEnd();
  // }

  // tslint:disable-next-line: no-shadowed-variable
  GenerateMapLeaflet() {
    // var map = L.map('map').setView([51.505, -0.09], 13);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // L.marker([51.5, -0.09]).addTo(map)
    //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //   .openPopup();
  }
  //#endregion

  // const elements = stripe.elements();
  // const data = {
  //   clientSecret: 'sk_test_51HXya7EBr7ET6lVJB1AGb1SPlyWiGYUhv39zLBFRPqyKQk4wTWxHAZWJKfPNwLLYg5BMDsvbFYYxgzzUJAcQA8PD00TJg2bSdT',
  //   publicKey: 'pk_test_51HXya7EBr7ET6lVJzagRfQLbyPHuUUA2fiubhV68rK5BGiVpjgkNwvWf0aqTiAzV7i0afuyhZ51qaf9wKwU9DuNv004qz4ckgX'
  // };

  private setDelivery(deliveryMethod: DeliveryMethod) {
    // const deliveryMethod: IDeliveryMethod = { Latitude: coordinates.latitude, Longitude: coordinates.longitude, PlaceName: place, PostCode: postcode };
    this.formOrdering.setValue(deliveryMethod);
    this.formOrdering.updateValueAndValidity({ emitEvent: true, onlySelf: true });
    this.orderingComplete = true;
  }

  private getAddress(lng: number, lat: number) {
    const longitude = lng;
    const latitude = lat;
    // tslint:disable-next-line: deprecation
    this.subscriptionMapBoxResult$ = this.getMapBoxResult(longitude, lat).subscribe({
      next: (response: any) => {
        // console.log('subscriptionMapBoxResult$', response);
        const features = response.features;
        const coordinates = { longitude: response.query[0], latitude: response.query[1] };

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
        const deliveryMethod: IDeliveryMethod = { Latitude: coordinates.latitude, Longitude: coordinates.longitude, PlaceName: place, PostCode: postcode };
        this.formContact.controls.Country.setValue(country);
        this.setDelivery(deliveryMethod);
        // console.log($component.formOrdering.getRawValue());
      },
      error: (err) => { console.log('subscriptionMapBoxResult$', err); }
    });
  }

  mapboxRefreshResize(){
    this.mapboxGL.resize();
  }

  mapboxOnLoad(evt: mapboxgl.Map) {
    this.mapboxGL = evt;
    if (DEBUG) { console.groupCollapsed('mapboxOnLoad'); }
    // if (DEBUG) { console.log(this.mapboxGL.getCenter(), {evt}); }
    // if (DEBUG) { console.log('mapboxGL', this.mapboxGL); }
    // if (DEBUG) { console.log('mapboxGeolocate', this.mapboxGeolocate); }
    // if (DEBUG) { console.log('mapboxGeocoder', this.mapboxGeocoder); }
    // if (DEBUG) { console.log('mapboxMarker', this.mapboxMarker); }
    const geolocate = this.mapboxGeolocate.control as GeolocateControl;
    geolocate.trigger();
    if (DEBUG) { console.groupEnd(); }
  }

  mapbixOnMouseDown(evt: EventData) {
    // if (DEBUG) { console.groupCollapsed('mapbixOnMouseDown'); }
    // if (DEBUG) { console.log('mapbixOnMouseDown', evt, ); }
    this.mapboxHighAccuracy = false;
    this.mapboxShowUserLocate = false;
    this.mapboxTrackUserLocate = false;
    const container: HTMLElement = (evt as MapboxEvent).target.getContainer();
    const buttonGeolocate: HTMLButtonElement = container.querySelector('.mapboxgl-control-container button.mapboxgl-ctrl-geolocate');
    if (this.mapboxLocations) { buttonGeolocate.click(); }
    this.mapboxLocations = false;
    // if (DEBUG) {console.groupEnd(); }
  }

  mapboxOnDragStart(evt: EventData) {
    // if (DEBUG) { console.groupCollapsed('mapboxOnDragStart'); }
    // if (DEBUG) { console.log('mapboxOnDragEnd', evt, ); }
    // if (DEBUG) {console.groupEnd(); }
  }

  mapbixOnMouseEnd(evt: EventData) {
    // if (DEBUG) { console.groupCollapsed('mapbixOnMouseEnd'); }
    this.mapboxGL.resize();
    // if (DEBUG) {console.groupEnd(); }
  }

  mapboxOnMove(evt: EventData) {
    // if (DEBUG) { console.groupCollapsed('mapboxOnMove'); }
    const coords: LngLat = this.mapboxGL.getCenter();
    this.mapboxMarkerCenter = coords;
    const deliveryMethod: IDeliveryMethod = {
      Latitude: coords.lat,
      Longitude: coords.lng,
      PlaceName: '',
      PostCode: 0
    };
    // this.formContact.controls.Country.setValue(country);
    this.setDelivery(deliveryMethod);
    // if (DEBUG) { console.groupEnd(); }
  }

  mapboxOnMoveEnd(evt: EventData) {
    // if (DEBUG) { console.groupCollapsed('mapboxOnMoveEnd'); }
    // this.mapboxGL.resize();
    // if (DEBUG) { console.groupEnd(); }
  }

  mapbboxSourceData(evt: EventData) {
    if (DEBUG) {console.groupCollapsed('mapbboxSourceData'); }
    if (DEBUG) {console.log('evt', { evt }); }
    // this.mapboxMap.resize();
    if (DEBUG) {console.groupEnd(); }
  }

  mapbboxSourceDataLoading(evt: EventData) {
    if (DEBUG) {console.groupCollapsed('mapbboxSourceDataLoading'); }
    if (DEBUG) {console.log('evt', { evt }); }
    // this.mapboxMap.resize();
    if (DEBUG) {console.groupEnd(); }
  }

  mapboxOnGeolocate(evt: Position) {
    if (DEBUG) {  console.groupCollapsed('mapboxOnGeolocate'); }
    if (DEBUG) { console.log('evt', {evt}); }
    if (DEBUG) { console.log('mapboxGL', this.mapboxGL); }
    this.mapboxLocations = true;
    this.mapboxHighAccuracy = true;
    this.mapboxShowUserLocate = true;
    this.mapboxTrackUserLocate = true;
    const geocoder = this.mapboxGeocoder.control as MapboxGeocoder;
    const longitude = evt.coords.longitude;
    const latitude = evt.coords.latitude;
    const coords = { coordinates: [-90.32958984375, -0.6344474832838974] };
    // this.getAddress(longitude, latitude);
    if (DEBUG) { console.log('geocoder', {geocoder}); }
    // setTimeout(() => {
    //   geocoder.setTypes('address');
    //   geocoder.setLimit(0);
    //   // geocoder.query(`lng: ${latitude}, lat: ${longitude}`);
    //   geocoder.query(`${longitude},${latitude}`);
    //   geocoder.clear(null);
    // }, 1500);
    this.mapboxRefreshResize();
    if (DEBUG) { console.groupEnd(); }
  }

  mapboxOnGeocoderResults(evt: any) {
    if (DEBUG) { console.groupCollapsed('mapboxOnGeocoderResults'); }
    if (DEBUG) { console.log(evt); }
    if (DEBUG) { console.groupEnd(); }
  }

  mapboxOnGeocoderResult(evt: any) {
    if (DEBUG) { console.groupCollapsed('mapboxOnGeocoderResult'); }
    if (DEBUG) { console.log(evt); }
    this.mapboxGL.resize();
    const { result } = evt;

    const coordinates: LngLatLike = { lng: result.center[0], lat: result.center[1] };

    const place = result.place_name;
    const address = result.context.find(i => i.id.includes('address')) ? result.context.find(i => i.id.includes('address')).text : '';
    const postcode = result.context.find(i => i.id.includes('postcode')) ? result.context.find(i => i.id.includes('postcode')).text : '';
    const city = result.context.find(i => i.id.includes('place')) ? result.context.find(i => i.id.includes('place')).text : '';
    const state = result.context.find(i => i.id.includes('region')) ? result.context.find(i => i.id.includes('region')).text : '';
    const country = result.context.find(i => i.id.includes('country')) ? result.context.find(i => i.id.includes('country')).text : '';
    const countryCode = result.context.find(i => i.id.includes('country')) ? result.context.find(i => i.id.includes('country')).short_code : '';

    this.mapboxGL.setCenter(coordinates);

    const deliveryMethod: IDeliveryMethod = { Latitude: coordinates.lat, Longitude: coordinates.lng, PlaceName: place, PostCode: postcode };
    this.formContact.controls.Country.setValue(country);
    this.setDelivery(deliveryMethod);
    if (DEBUG) { console.groupEnd(); }
  }

  mapboxOnGeocoderError(evt: any) {
    if (DEBUG) { console.groupCollapsed('mapboxOnGeocoderError'); }
    if (DEBUG) { console.log(evt); }
    if (DEBUG) { console.groupEnd(); }
  }

  markerDragEnd(evt: Marker) {
    if (DEBUG) {console.groupCollapsed('mapbboxSourceData'); }
    if (DEBUG) {console.log('evt', { evt }); }
    // const deliveryMethod: IDeliveryMethod = { Latitude: coordinates.lat, Longitude: coordinates.lng };
    // this.formContact.controls.Country.setValue(country);
    // this.setDelivery(deliveryMethod);
    if (DEBUG) {console.groupEnd(); }
  }

  /*
  GenerateMapBox() {
    const coordinatesGeocoder = (query) => {
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
    };

    const coordinates = document.getElementById('coordinates');
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [-86.8475, 21.16056],
      accessToken: this.MAPBOX_ACCESS_TOKEN,
      trackResize: true,
      maxBounds: [
        -86.9712121848562, 21.0297633301856, // Southwest coordinates
        -86.7405402017646, 21.2130333805118, // Northeast coordinates
      ],
    });

    // Add map controlss
    const navigate: NavigationControl = new mapboxgl.NavigationControl();
    const geolocate: GeolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true }, trackUserLocation: false
    });
    const geocoder: MapboxGeocoder = new MapboxGeocoder({
      mapboxgl,
      accessToken: this.MAPBOX_ACCESS_TOKEN,
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

    const marker: Marker = new mapboxgl.Marker({ draggable: true });
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
            const deliveryMethod: IDeliveryMethod = { Latitude: coordinates.latitude, Longitude: coordinates.longitude, PlaceName: place, PostCode: postcode };
            $component.formOrdering.setValue(deliveryMethod);
            $component.formOrdering.updateValueAndValidity({ emitEvent: true, onlySelf: true });
            $component.orderingComplete = true;
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
  */

  getCurrentStep(step: StepsPaymentGateway) {
    return (this.CurrentStep !== step);
  }

  onClickChangeStep(step: StepsPaymentGateway) {
    this.CurrentStep = (this.CurrentStep !== step ? step : 0);
    if (step === StepsPaymentGateway.Ordering) {
      setTimeout(() => this.mapboxRefreshResize(), 100);
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



  // START: STRIPE
  // Show only the payment methods that are relevant to the selected country.
  // showRelevantPaymentMethods = (country: any) => {
  //   const form = document.getElementById('payment-form');

  //   if (!country) {
  //     country = form.querySelector<HTMLSelectElement>('select[name=country] option:checked').value;
  //   }

  //   const paymentInputs = form.querySelectorAll<HTMLInputElement>('input[name=payment]');
  //   paymentInputs.forEach(input => {
  //     input.parentElement.classList.toggle(
  //       'visible',
  //       input.value === 'card' ||
  //       (config.paymentMethods.includes(input.value) &&
  //         paymentMethods[input.value].countries.includes(country) &&
  //         paymentMethods[input.value].currencies.includes(activeCurrency))
  //     );
  //   });

  //   // Hide the tabs if card is the only available option.
  //   const paymentMethodsTabs = document.getElementById('payment-methods');
  //   paymentMethodsTabs.classList.toggle(
  //     'visible',
  //     paymentMethodsTabs.querySelectorAll('li.visible').length > 1
  //   );

  //   // Check the first payment option again.
  //   paymentInputs[0].checked = 'checked';
  //   form.querySelector('.payment-info.card').classList.add('visible');
  //   form.querySelector('.payment-info.ideal').classList.remove('visible');
  //   form.querySelector('.payment-info.sepa_debit').classList.remove('visible');
  //   form.querySelector('.payment-info.wechat').classList.remove('visible');
  //   form.querySelector('.payment-info.redirect').classList.remove('visible');
  //   form
  //     .querySelector('.payment-info.au_becs_debit')
  //     .classList.remove('visible');
  //   updateButtonLabel(paymentInputs[0].value);
  // }
  // END
}
