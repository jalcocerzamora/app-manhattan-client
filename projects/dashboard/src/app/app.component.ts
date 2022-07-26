import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MasterComponent } from './components/master/master.component';

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
    public title: Title,
  ) {
    super(document, route, title);
  }

  // ngOnInit(): void {
  //   console.log('AppComponent.ngOnInit');
  // }
}
