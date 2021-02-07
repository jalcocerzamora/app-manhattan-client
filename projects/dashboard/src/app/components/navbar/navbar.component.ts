import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'projects/core/services';

// import { CookieService } from 'ngx-cookie-service'
// import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    // public _serviceShopCart: ShopCartService,
  ) { }

  ngOnInit(): void {
    // this.afAuth.user.subscribe(user => {
    //   if (user){
    //     this.user = user;
    //   }
    // });
  }

  onLogOut(){
    this.auth.logout();
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => { this.router.navigate(['/']); });
  }

}
