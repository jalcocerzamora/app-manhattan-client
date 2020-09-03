import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const toggle = this.navbarToggler.nativeElement;
    toggle.addEventListener('click', () => {
      this.navbarToggler.nativeElement.classList.toggle('active');
    });
  }

}
