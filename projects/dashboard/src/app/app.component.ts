import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MasterComponent } from './pages/pages.module';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends MasterComponent {
  // public bodyPage: string = 'app';
  constructor(
    @Inject(DOCUMENT) document: Document,
    route: ActivatedRoute,
    title: Title,
  ) {
    super(document, route, title);
  }

  // ngOnInit(): void {
  //   console.log('AppComponent.ngOnInit');
  // }
}
