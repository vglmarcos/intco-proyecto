import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';

@Component({
    selector: 'app-agregar-producto',
    templateUrl: './agregar-producto.component.html',
    styleUrls: ['./agregar-producto.component.css']
})

export class AgregarProductoComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;

    public producto: IProducto;

    public agregarProductoFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AgregarProductoComponent>,
        public dialog: MatDialog,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private productoService: ProductoService,
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
        this.agregarProductoFormGroup = this._formBuilder.group({
            nombreCtrl: ['', Validators.required],
            tipoCtrl: ['', Validators.required],
            precioCtrl: ['', Validators.required],
        });
    }

    cancelar() {
        this.dialogRef.close({
            res: false
        });
    }

    agregarProducto() {
        if(!this.agregarProductoFormGroup.hasError('required')) {
            this.producto = {
                nombre: this.agregarProductoFormGroup.controls['nombreCtrl'].value,
                tipo: this.agregarProductoFormGroup.controls['tipoCtrl'].value,
                precio: this.agregarProductoFormGroup.controls['precioCtrl'].value,
            };
            this.productoService.agregarProductoPost(this.producto).subscribe(res => {
                this.dialogRef.close({
                    res: true
                });
            });
        }
    }
}