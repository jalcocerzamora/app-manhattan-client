import { FormControl, ValidationErrors } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { addonsExtension } from 'projects/core/helpers/addon.extension';
import {
    FormlyFieldInputComponent,
    FormlyFieldFileComponent,
    FormlyFieldQuantityComponent,
    FormlyFieldRadioComponent,
    FormlyWrapperFormFieldComponent,
    FormlyFieldCheckboxComponent,
    FormlyFieldSelectComponent,
    FormlyFieldTextAreaComponent
} from '.';
import { FormlyWrapperFormAddonsComponent } from './wrappers';

export function dateFutureValidator(control: FormControl, field: FormlyFieldConfig, options = {}): ValidationErrors {
    return { 'date-future': { message: `Validator options: ${JSON.stringify(options)}` } };
}

const emailRegex =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


export const FormlyConfig = {
    validationMessages: [
        { name: 'required', message: 'This field is required' },
    ],
    types: [
        { name: 'string',   extends: 'input' },
        // { name: 'number', extends: 'input', defaultOptions: { templateOptions: { type: 'number', }, }, },
        { name: 'input',    component: FormlyFieldInputComponent,       wrappers: ['form-field'], },
        { name: 'file',    component: FormlyFieldFileComponent,       wrappers: ['form-field'], },
        { name: 'integer',  extends: 'input', defaultOptions: { templateOptions: { type: 'number', }, }, },
        { name: 'tel',      extends: 'input', defaultOptions: { templateOptions: { type: 'tel', pattern: '[0-9]{3}[0-9]{3}[0-9]{4}' }, }, },
        { name: 'email',    extends: 'input', defaultOptions: { templateOptions: { type: 'email', /*pattern: "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"*/ }, }, },

        { name: 'number',   component: FormlyFieldQuantityComponent,    wrappers: ['form-field'], },
        { name: 'radio',    component: FormlyFieldRadioComponent,       wrappers: ['form-field'], },
        { name: 'textarea', component: FormlyFieldTextAreaComponent,    wrappers: ['form-field'], },
        { name: 'select',   component: FormlyFieldSelectComponent,      wrappers: ['form-field'], },
        { name: 'enum',     extends: 'select' },
        { name: 'checkbox', component: FormlyFieldCheckboxComponent },
        { name: 'boolean',  extends: 'checkbox', },
    ],
    wrappers: [
        { name: 'form-field', component: FormlyWrapperFormFieldComponent, },
        { name: 'addons', component: FormlyWrapperFormAddonsComponent },
    ],
    extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
    validators: [{ name: 'date-future', validation: dateFutureValidator, options: { days: 1 }, }],
    extras: {
        lazyRender: true,
        // showError: field => {
        //     return ( field.formState.submitted || field.formControl.touched || (field.field.validation && field.field.validation.show) ) && !field.formControl.valid;
        // },
    },
};
