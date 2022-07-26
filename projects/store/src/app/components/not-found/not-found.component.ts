import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public returnUrl: string | null = null;

  constructor(
    // private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe({
      next: (params) => this.returnUrl = params.returnUrl,
      error: () => {}
    });
    // this.router. url === '/login'
  }

}
