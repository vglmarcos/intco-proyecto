import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-agregar-cotizacion',
    templateUrl: './agregar-cotizacion.component.html',
    styleUrls: ['./agregar-cotizacion.component.css'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})

export class AgregarCotizacionComponent implements OnInit {

    myControl = new FormControl();
    filteredOptions: Observable<IProducto[]>;
    public PRODUCTOS: IProducto[];

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;


    public actualTheme: string;
    public color = 'primary';

    constructor(
        public dialogRef: MatDialogRef<AgregarCotizacionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private productoService: ProductoService
    ) {
        this.actualizarDatos();
        this.colorThemeService.theme.subscribe((theme) => {
            this.actualTheme = theme;
        });
    }

    actualizarDatos() {
        this.productoService.obtenerProductosGet().subscribe(productos => {
            this.PRODUCTOS = productos;
            this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        });
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            secondCtrl: ['', Validators.required],
            thirdCtrl: ['', Validators.required],
            fourCtrl: ['', Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    private _filter(nombre: string): IProducto[] {
        const filterValue = nombre.toLowerCase();

        return this.PRODUCTOS.filter(producto => producto.nombre.toLowerCase().includes(filterValue));
    }

    cancelar() {
        console.log('sas')
        this.dialogRef.close({
            res: "ok"
        });
    }

}