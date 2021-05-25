import { Component, OnInit, Inject } from '@angular/core';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/api/proveedor/proveedor.service';
import { IProveedor } from 'src/app/models/IProveedor';

@Component({
    selector: 'app-editar-proveedor',
    templateUrl: './editar-proveedor.component.html',
    styleUrls: ['./editar-proveedor.component.css']
})

export class EditarProveedorComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;

    public agregarProveedorFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditarProveedorComponent>,
        public dialog: MatDialog,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private proveedorService: ProveedorService,
        @Inject(MAT_DIALOG_DATA) public proveedor: IProveedor,
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
            nombreCtrl: [this.proveedor.nombre, Validators.required],
            telefonoCtrl: [this.proveedor.telefono, Validators.required],
            ubicacionCtrl: [this.proveedor.ubicacion, Validators.required]
        });
    }

    cancelar() {
        this.dialogRef.close({
            res: false
        });
    }

    EditarProveedor() {
        if(!this.agregarProveedorFormGroup.hasError('required')) {
            this.proveedor.nombre = this.agregarProveedorFormGroup.controls['nombreCtrl'].value;
            this.proveedor.telefono = this.agregarProveedorFormGroup.controls['telefonoCtrl'].value;
            this.proveedor.ubicacion = this.agregarProveedorFormGroup.controls['ubicacionCtrl'].value;
            this.proveedorService.editarProveedorPut(this.proveedor).subscribe(res => {
                this.dialogRef.close({
                    res: true
                });
            });
        }
    }
}