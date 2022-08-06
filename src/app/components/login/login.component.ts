import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('resetStudentForm') myNgForm: any;

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    passWord: ['', [Validators.required]]

  })

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  constructor(
    public fb: FormBuilder,
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }

  public handleError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  submitLoginForm(): void {
    const username1 = this.loginForm.value.userName;
    const password1 = this.loginForm.value.passWord;
    console.log(username1);
    console.log(password1);

    this.authService.login(username1, password1).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //this.reloadPage();
        this.router.navigate(["/villes-list"])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }


}
