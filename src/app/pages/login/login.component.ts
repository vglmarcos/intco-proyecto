import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/api/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public backColorMode: string;
  public cardColorMode: string;
  public buttonColorMode: string;
  public snackBarColorMode: string;
  public themeOption: string;

  userCtrl = new FormControl('', [Validators.required]);
  passCtrl = new FormControl('', [Validators.required]);

  public user: string;
  public password: string;

  // form: FormGroup;

  constructor(public colorThemeService: ColorThemeService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
    this.colorThemeService.theme.subscribe((theme) => {
      this.actualTheme = theme;
      this.viewColor();
    });

    // this.form = this.fb.group({
    //   'user': ['', Validators.required],
    //   'password': ['', Validators.required]
    // });
  }

  viewColor() {
    console.log(this.actualTheme)
    switch (this.actualTheme) {
      case 'light-cyan-theme': this.themeOption = 'light-cyan-theme'; this.buttonColorMode = 'light-cyan-button'; this.snackBarColorMode = 'light-cyan-snack'; break;
      case 'dark-cyan-theme': this.themeOption = 'dark-cyan-theme'; this.buttonColorMode = 'dark-cyan-button'; this.snackBarColorMode = 'dark-cyan-snack'; break;
      case 'light-blue-theme': this.themeOption = 'light-blue-theme'; this.buttonColorMode = 'light-blue-button'; this.snackBarColorMode = 'light-blue-snack'; break;
      case 'dark-blue-theme': this.themeOption = 'dark-blue-theme'; this.buttonColorMode = 'dark-blue-button'; this.snackBarColorMode = 'dark-blue-snack'; break;
      case 'light-purple-theme': this.themeOption = 'light-purple-theme'; this.buttonColorMode = 'light-purple-button'; this.snackBarColorMode = 'light-purple-snack'; break;
      case 'dark-purple-theme': this.themeOption = 'dark-purple-theme'; this.buttonColorMode = 'dark-purple-button'; this.snackBarColorMode = 'dark-purple-snack'; break;
      case 'light-pink-theme': this.themeOption = 'light-pink-theme'; this.buttonColorMode = 'light-pink-button'; this.snackBarColorMode = 'light-pink-snack'; break;
      case 'dark-pink-theme': this.themeOption = 'dark-pink-theme'; this.buttonColorMode = 'dark-pink-button'; this.snackBarColorMode = 'dark-pink-snack'; break;
      case 'light-orange-theme': this.themeOption = 'light-orange-theme'; this.buttonColorMode = 'light-orange-button'; this.snackBarColorMode = 'light-orange-snack'; break;
      case 'dark-orange-theme': this.themeOption = 'dark-orange-theme'; this.buttonColorMode = 'dark-orange-button'; this.snackBarColorMode = 'dark-orange-snack'; break;
      case 'light-teal-theme': this.themeOption = 'light-teal-theme'; this.buttonColorMode = 'light-teal-button'; this.snackBarColorMode = 'light-teal-snack'; break;
      case 'dark-teal-theme': this.themeOption = 'dark-teal-theme'; this.buttonColorMode = 'dark-teal-button'; this.snackBarColorMode = 'dark-teal-snack'; break;
      case 'light-green-theme': this.themeOption = 'light-green-theme'; this.buttonColorMode = 'light-green-button'; this.snackBarColorMode = 'light-green-snack'; break;
      case 'dark-green-theme': this.themeOption = 'dark-green-theme'; this.buttonColorMode = 'dark-green-button'; this.snackBarColorMode = 'dark-green-snack'; break;
      case 'light-gray-theme': this.themeOption = 'light-gray-theme'; this.buttonColorMode = 'light-gray-button'; this.snackBarColorMode = 'light-gray-snack'; break;
      case 'dark-gray-theme': this.themeOption = 'dark-gray-theme'; this.buttonColorMode = 'dark-gray-button'; this.snackBarColorMode = 'dark-gray-snack'; break;
    }
    console.log(this.themeOption);
    if (this.actualTheme.includes(this.dark)) {
      this.backColorMode = 'backDark';
      this.cardColorMode = 'cardDark';
    }
    if (this.actualTheme.includes(this.light)) {
      this.backColorMode = 'backLight';
      this.cardColorMode = 'cardLight';
    }
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.userCtrl.hasError('required')) {
      return 'Se debe de ingresar un valor';
    }
    if (this.passCtrl.hasError('required')) {
      return 'Se debe de ingresar un valor';
    }
  }

  onSubmit(): void {
    if (this.loginService.iniciarSesion(this.user, this.password)) {
      this.router.navigate(['/buscar-cotizacion']);
      console.log('ok');
      this._snackBar.open('Bienvenido al sistema', '', {
        duration: 2000,
        panelClass: ['snackBarGreen']
      });
    }
    else {
      this._snackBar.open('Usuario o contraseña incorrectos, favor de intentar nuevamente', '', {
        duration: 2000,
        panelClass: ['snackBarRed']
      });
    }
  }

}
