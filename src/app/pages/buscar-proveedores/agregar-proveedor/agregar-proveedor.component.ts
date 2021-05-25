import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/api/proveedor/proveedor.service';
import { IProveedor } from 'src/app/models/IProveedor';

@Component({
    selector: 'app-agregar-proveedor',
    templateUrl: './agregar-proveedor.component.html',
    styleUrls: ['./agregar-proveedor.component.css']
})

export class AgregarProveedorComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;

    public proveedor: IProveedor;

    public agregarProveedorFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AgregarProveedorComponent>,
        public dialog: MatDialog,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private proveedorService: ProveedorService,
    ) {
        this.colorThemeService.theme.subscribe((theme) => {
            this.actualTheme = theme;
            this.viewColor();
        });
    }

    viewColor() {
        if (this.actualTheme.includes(this.dark)) {
            this.colorMode = this.dark;
        }
        if (this.actualTheme.includes(this.light)) {
            this.colorMode = this.light;
        }
        console.log(this.colorMode);
    }

    ngOnInit() {
        this.agregarProveedorFormGroup = this._formBuilder.group({
            nombreCtrl: ['', Validators.required],
            telefonoCtrl: ['', Validators.required],
            ubicacionCtrl: ['', Validators.required]
        });
    }

    cancelar() {
        this.dialogRef.close({
            res: false
        });
    }

    agregarProveedor() {
        if(!this.agregarProveedorFormGroup.hasError('required')) {
            this.proveedor = {
                nombre: this.agregarProveedorFormGroup.controls['nombreCtrl'].value,
                telefono: this.agregarProveedorFormGroup.controls['telefonoCtrl'].value,
                ubicacion: this.agregarProveedorFormGroup.controls['ubicacionCtrl'].value,
                id_lamina: 1,
                id_producto: 1
            };
            this.proveedorService.agregarProveedorPost(this.proveedor).subscribe(res => {
                this.dialogRef.close({
                    res: true
                });
            });
        }
    }
}