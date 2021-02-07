import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from 'projects/core/services';

import { Login } from 'projects/core/models/db';
import { MasterComponent } from '../pages.module';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends MasterComponent implements OnInit {
  private returnUrl: string;

  pageTitle = '';
  pageBodyClass = 'login';

  public errorMessage: string;
  public loading = false;
  public submitted = false;

  public loginComplete = false;
  public formLogin: FormGroup = new FormGroup({});
  public modelLogin: Login = { Username: 'jalcocer', Password: '12345'};
  public optionsLogin: FormlyFormOptions = {}; // { formState: { awesomeIsForced: true, } };
  public fieldsLogin: FormlyFieldConfig[] = [];

  constructor(
    @Inject(DOCUMENT) document: Document,
    route: ActivatedRoute,
    title: Title,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) {
    super(document, route, title);
  }

  ngOnInit(){
    console.log('LoginComponent.ngOnInit');
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.runNgOnInit();
    this.fieldsLogin = [
      {
        fieldGroupClassName: 'content-start flex flex-col justify-between',
        fieldGroup: [
          {
            key: 'Username', type: 'input', defaultValue: '', className: 'flex-grow lg:flex-grow mb-5',
            templateOptions: { placeholder: 'LOGIN.FORM.txtEmail', inputClass: 'intro-x', addonLeft: { icon: 'envelope', }, required: true, translate: true, },
            validation: { show: false, messages: { pattern: (error, field: FormlyFieldConfig) => this.translate.stream('FORM.VALIDATION.EMAIL', { value: field.formControl.value }), }, },
            // validators: {
            //   validation: Validators.compose([Validators.required, ValidationService.emailValidator])
            // }
          },
          {
            key: 'Password', type: 'input', defaultValue: '', className: 'flex-grow mb-5',
            templateOptions: { placeholder: '**********', inputClass: 'intro-x', addonLeft: { icon: 'key', }, required: true, translate: true, }, // look-open | lock | unlock
            validation: { show: false, },
          },
        ]
      },
      {
        fieldGroupClassName: 'content-start flex flex-row justify-between',
        fieldGroup: [
          {
            key: 'checkbox', type: 'checkbox', defaultValue: '', className: 'flex-grow lg:flex-grow mb-5',
            templateOptions: { label: 'Recordarme', inputClass: 'intro-x', pattern: 'true', translate: false, },
            validation: {
              // show: false,
              messages: {
                pattern: 'Please accept the terms',
                // pattern: (error, field: FormlyFieldConfig) => this.translate.stream('FORM.VALIDATION.EMAIL', { value: field.formControl.value }), },
              },
            // validators: {
            //   validation: Validators.compose([Validators.required, ValidationService.emailValidator])
            }
          },
          {
            templateOptions: { label: 'Recordarme', },
            template: '<a href="" translate="\'LOGIN.FORM.btnLogin\'">Forgot Password?</a>'
          },
          // {
          //   className: 'section-label',
          //   template: '<hr /><div><strong>Address:</strong></div>',
          // },
          // {
          //   key: 'Password', type: 'input', defaultValue: '', className: 'flex-grow mb-5',
          //   templateOptions: { placeholder: '**********', inputClass: 'intro-x', addonLeft: { icon: 'key', }, required: true, translate: true, }, // look-open | lock | unlock
          //   validation: { show: false, },
          // },
        ]
      },
    ];
  }

  f(control: string) {
    return null; // (control && control !== null ? this.formLogin : this.formLogin.controls[control].value);
  }

  onSubmitLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }

    this.loading = true;

    this.auth.login(this.modelLogin.Username, this.modelLogin.Password).pipe(first()).subscribe(
      next => {
        console.log(this.returnUrl, next);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.errorMessage = error;
        this.loading = false;
      });
  }
}
