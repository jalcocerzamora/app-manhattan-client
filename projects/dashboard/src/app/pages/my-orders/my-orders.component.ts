import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MasterComponent } from '../pages.module';

@Component({
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent extends MasterComponent implements OnInit {
  pageTitle = '';
  pageBodyClass = 'orders';

  constructor(
    @Inject(DOCUMENT) document: Document,
    route: ActivatedRoute,
    title: Title,
    private translate: TranslateService,
    private fb: FormBuilder,
  ) {
    super(document, route, title);
  }

  ngOnInit(): void {
    this.runNgOnInit();
  }

}
