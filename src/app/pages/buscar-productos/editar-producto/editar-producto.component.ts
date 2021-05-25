import { Component, OnInit, Inject } from '@angular/core';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { IProducto } from 'src/app/models/IProducto';

@Component({
    selector: 'app-editar-producto',
    templateUrl: './editar-producto.component.html',
    styleUrls: ['./editar-producto.component.css']
})

export class EditarProductoComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;

    public editarProductoFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditarProductoComponent>,
        public dialog: MatDialog,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private productoService: ProductoService,
        @Inject(MAT_DIALOG_DATA) public producto: IProducto,
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
        this.editarProductoFormGroup = this._formBuilder.group({
            nombreCtrl: [this.producto.nombre, Validators.required],
            tipoCtrl: [this.producto.tipo, Validators.required],
            precioCtrl: [this.producto.precio, Validators.required],
        });
    }

    cancelar() {
        this.dialogRef.close({
            res: false
        });
    }

    editarUsuario() {
        if(!this.editarProductoFormGroup.hasError('required')) {
            this.producto.nombre = this.editarProductoFormGroup.controls['nombreCtrl'].value;
            this.producto.tipo = this.editarProductoFormGroup.controls['tipoCtrl'].value;
            this.producto.precio = this.editarProductoFormGroup.controls['precioCtrl'].value;
            this.productoService.editarProductoPut(this.producto).subscribe(res => {
                this.dialogRef.close({
                    res: true
                });
            });
        }
    }
}