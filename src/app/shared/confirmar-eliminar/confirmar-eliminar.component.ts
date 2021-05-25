import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorThemeService } from 'src/app/services/color-theme.service';

@Component({
  selector: 'app-confirmar-eliminar',
  templateUrl: './confirmar-eliminar.component.html',
  styleUrls: ['./confirmar-eliminar.component.css']
})
export class ConfirmarEliminarComponent implements OnInit {

  public actualTheme: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    public colorThemeService: ColorThemeService,
    public dialogRef: MatDialogRef<ConfirmarEliminarComponent>
  ) {
    this.colorThemeService.theme.subscribe((theme) => {
      this.actualTheme = theme;
    });
  }

  ngOnInit(): void {
  }

  cancelar() {
    console.log('cancelar')
    this.dialogRef.close({
        res: false
    });
  } 

  confirmar() {
    console.log('confirmar')
    this.dialogRef.close({
      res: true
    });
  }

}