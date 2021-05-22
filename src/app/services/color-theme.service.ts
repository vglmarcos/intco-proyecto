import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {

  private _theme: string = 'light-cyan-theme';

  private _theme$: BehaviorSubject<string> = new BehaviorSubject(this._theme);

  constructor() {

  }

  get theme() {
    return this._theme$.asObservable();
  }

  set theme(theme: any) {
    this._theme = theme;
    this._theme$.next(this._theme);
  }
}