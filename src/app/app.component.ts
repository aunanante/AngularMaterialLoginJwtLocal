import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ville Commerce Produit';
  opened = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    console.log(window.innerWidth)
    /* if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    } */
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();

  }

}
