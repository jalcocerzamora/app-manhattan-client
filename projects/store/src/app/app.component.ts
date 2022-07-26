import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  } from '@angular/core';
import { AuthGuard } from 'projects/core/helpers';
import { environment } from 'projects/environments/environment';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
// import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title = 'store';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    // private authenticationService: AuthenticationService
  ) {
    console.log('AppComponent.constructor');
    // this.authenticationService.login(environment.BACKEND_USERNAME, environment.BACKEND_PASSWORD)
    //     .toPromise()
    //     .finally();
  }

  ngOnInit() {
    // console.log('AppComponent.ngOnInit');
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      // tslint:disable-next-line: deprecation
      ).subscribe({
        next: () => {
          const rt = this.getChild(this.activatedRoute);
          rt.data.subscribe((data: any) => { this.titleService.setTitle(data.title); });
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
