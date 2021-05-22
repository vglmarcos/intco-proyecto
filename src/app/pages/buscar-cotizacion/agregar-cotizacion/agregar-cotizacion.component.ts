import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
    selector: 'app-agregar-cotizacion',
    templateUrl: './agregar-cotizacion.component.html',
    styleUrls: ['./agregar-cotizacion.component.css'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})

export class AgregarCotizacionComponent implements OnInit {

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;


    public actualTheme: string;
    public color = 'accent';

    constructor(
        public dialogRef: MatDialogRef<AgregarCotizacionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder
    ) {
        this.colorThemeService.theme.subscribe((theme) => {
            this.actualTheme = theme;
        });
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
      }

    cancelar() {
        this.dialogRef.close({
            res: "ok"
        });
    }

}