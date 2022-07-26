import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslateExtension {
  constructor(private translate: TranslateService) {}
  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};
    if (!to.translate || to._translated) {
      return;
    }

    // console.log('TranslateExtension=>', field, field.expressionProperties);

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': (to.label ? this.translate.stream(to.label) : ''),
      'templateOptions.placeholder': (to.placeholder ? this.translate.stream(to.placeholder) : ''),
    };
  }
}

export function registerTranslateExtension(translate: TranslateService) {
  return {
    validationMessages: [
      {
        name: 'required',
        message() {
          // console.log('registerTranslateExtension', translate);
          return translate.stream('FORM.VALIDATION.REQUIRED');
        },
      },
    ],
    extensions: [{
      name: 'translate',
      extension: new TranslateExtension(translate),
    }],
  };
}

// ********************************************************************************************************

function trimLastSlashFromUrl(baseUrl: string) {
  if (baseUrl === undefined && baseUrl === null) {
    return null;
  } else if (baseUrl[baseUrl.length - 1] === '/') {
    const trimmedUrl = baseUrl.substring(0, baseUrl.length - 1);
    return trimmedUrl;
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient, s: PlatformLocation) {
  const baseHref = trimLastSlashFromUrl(s.getBaseHrefFromDOM());
  const prefix = baseHref?.concat('/assets/i18n/');
  // console.log('HttpLoaderFactory.', baseHref, prefix);
  return new TranslateHttpLoader(httpClient, prefix, '.json');
}
