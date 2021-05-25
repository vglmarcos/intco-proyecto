import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackbar: MatSnackBar) {

   }
   greenSnackBar(message: string){
      this._snackbar.open(message, '', {
        duration: 2000,
        panelClass: ['snackBarGreen']
      });
   }

   redSnackBar(message: string){
     this._snackbar.open(message, '', {
       duration: 2000,
       panelClass: ['snackBarRed']
     })
   }
}