import { Title } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  private MY_PAGES: string[] = ['login', 'dashboard', 'orders'];
  public pageBodyClass: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    protected route: ActivatedRoute,
    public title: Title,
  ) { }

  ngOnInit(): void {
    console.log('MasterComponent.ngOnInit');
    this.runNgOnInit();
  }

  runNgOnInit = () => {
    if (this.pageBodyClass) {
      this.MY_PAGES.forEach(page => (page !== this.pageBodyClass ? this.document.body.classList.remove(page) : this.document.body.classList.add(page)));
    }
    this.route.data.subscribe((data) => {
      if (data.title && data.title !== undefined) {
        this.title.setTitle(data.title);
      }
    });
  }
}
