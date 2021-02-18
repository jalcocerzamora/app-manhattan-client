import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  public currentLang = 'es';

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.currentLang);
  }

  ngOnInit(): void {
    // do stuff
  }

  public changeLanguage(lang) {
    this.currentLang = lang;
    this.translate.use(lang);
  }

}
