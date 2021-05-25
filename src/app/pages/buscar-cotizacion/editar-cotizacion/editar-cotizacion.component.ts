import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ICliente } from 'src/app/models/ICliente';
import { MatStepper } from '@angular/material/stepper';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { ICarrito } from 'src/app/models/ICarrito';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';

export interface item {
    id_producto: number,
    nombre: string,
    tipo: string,
    dimensiones: {
        largo: number,
        ancho: number
    },
    cantidad: number,
    precio_unitario: number,
    total: number
}

@Component({
    selector: 'app-editar-cotizacion',
    templateUrl: './editar-cotizacion.component.html',
    styleUrls: ['./editar-cotizacion.component.css'],
    providers: [
        { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
        { provide: MatPaginatorIntl, useValue: CustomPaginator() }
    ]
})

export class EditarCotizacionComponent implements OnInit {

    color = 'primary';
    public actualTheme: string;
    dark = 'dark';
    light = 'light';
    public colorMode: string;

    public filteredOptions: Observable<IProducto[]>;
    public PRODUCTOS: IProducto[];

    public checked: boolean = false;

    public firstFormGroup: FormGroup;
    public secondFormGroup: FormGroup;

    public cliente: ICliente = {
        nombre: '',
        telefono: '',
        correo: '',
        direccion: ''
    };
    public cotizacion: ICotizacion = {
        id_usuario: 0,
        id_cliente: 0,
        carrito: [],
        subtotal: 0,
        total: 0,
        estado: '',
    };

    public productosCarrito: item[] = [];
    public dataSource: MatTableDataSource<item>;

    public index = 1;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = [
        'nombre', 'tipo', 'dimensiones', 'cantidad', 'precio_unitario', 'total', 'eliminar'
    ];

    constructor(
        public dialogRef: MatDialogRef<EditarCotizacionComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: ICotizacion,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private productoService: ProductoService,
        private clienteService: ClienteService,
        private cotizacionService: CotizacionService,
        public snackBarService: SnackBarService
    ) {
        this.actualizarDatos();
        this.colorThemeService.theme.subscribe((theme) => {
            this.actualTheme = theme;
            this.viewColor();
        });

        this.cotizacion = this.data;
        
        this.checked = (this.cotizacion.estado === 'pendiente') ? false : true;

        this.productoService.obtenerProductosGet().subscribe(productos => {
            for(let i = 0; i < this.data.carrito.length; i++) {
                let producto = productos.find(producto => producto.id === this.data.carrito[i].id_producto)
                let item: item = {
                    cantidad: this.data.carrito[i].cantidad,
                    dimensiones: this.data.carrito[i].dimensiones,
                    id_producto: this.data.carrito[i].id_producto,
                    nombre: producto.nombre,
                    precio_unitario: producto.precio,
                    tipo: producto.tipo,
                    total: this.data.carrito[i].dimensiones.largo * this.data.carrito[i].dimensiones.ancho * this.data.carrito[i].cantidad * producto.precio
                }
                this.productosCarrito.push(item);
            }
            this.dataSource = new MatTableDataSource(this.productosCarrito);
            this.dataSource.paginator = this.paginator;
        });
    }

    actualizarDatos() {
        this.productoService.obtenerProductosGet().subscribe(productos => {
            this.PRODUCTOS = productos;
            this.filteredOptions = this.secondFormGroup.controls['nombreCtrl'].valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filter(value))
                );
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
        this.firstFormGroup = this._formBuilder.group({
            nombreCtrl: ['', Validators.required],
            correoCtrl: ['', [Validators.required, Validators.email]],
            telCtrl: ['', [Validators.required, Validators.minLength(10)]],
            dirCtrl: ['', Validators.required],
        });
        this.clienteService.obtenerClientesGet().subscribe(clientes => {
            console.log(this.data)
            this.cliente = clientes.find(cliente => cliente.id === this.data.id_cliente);
            console.log(this.cliente)
            this.firstFormGroup.controls['nombreCtrl'].setValue(this.cliente.nombre);
            this.firstFormGroup.controls['correoCtrl'].setValue(this.cliente.correo);
            this.firstFormGroup.controls['telCtrl'].setValue(this.cliente.telefono);
            this.firstFormGroup.controls['dirCtrl'].setValue(this.cliente.direccion);
        });
        this.secondFormGroup = this._formBuilder.group({
            nombreCtrl: [''],
            anchoCtrl: [''],
            largoCtrl: [''],
            precioCtrl: ['0'],
            cantidadCtrl: [''],
            totalCtrl: ['0'],
        });
    }

    private _filter(nombre: string): IProducto[] {
        const filterValue = nombre.toLowerCase();

        return this.PRODUCTOS.filter(producto => producto.nombre.toLowerCase().includes(filterValue));
    }

    ngAfterViewInit() {
        let ancho;
        let largo;
        let precio;
        let cantidad;
        let total;

        this.secondFormGroup.controls['nombreCtrl'].valueChanges.subscribe((value) => {
            let producto = this.findProductoByNombre(value);
            if (producto) {
                this.secondFormGroup.controls['precioCtrl'].setValue(producto.precio);
            } else {
                this.secondFormGroup.controls['precioCtrl'].setValue('');
            }
        });

        this.secondFormGroup.controls['anchoCtrl'].valueChanges.subscribe((value) => {
            if (value) {
                try {
                    ancho = parseFloat(value);
                    if (ancho && largo && cantidad && precio) {
                        total = ancho * largo * cantidad * precio;
                        this.secondFormGroup.controls['totalCtrl'].setValue(total);
                    } else {
                        this.secondFormGroup.controls['totalCtrl'].setValue('0');
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                ancho = value;
                this.secondFormGroup.controls['totalCtrl'].setValue('0');
            }
        });

        this.secondFormGroup.controls['largoCtrl'].valueChanges.subscribe((value) => {
            if (value) {
                try {
                    largo = parseFloat(value);
                    if (ancho && largo && cantidad && precio) {
                        total = ancho * largo * cantidad * precio;
                        this.secondFormGroup.controls['totalCtrl'].setValue(total);
                    } else {
                        this.secondFormGroup.controls['totalCtrl'].setValue('0');
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                largo = value;
                this.secondFormGroup.controls['totalCtrl'].setValue('0');
            }
        });

        this.secondFormGroup.controls['precioCtrl'].valueChanges.subscribe((value) => {
            if (value) {
                try {
                    precio = parseFloat(value);
                    if (ancho && largo && cantidad && precio) {
                        total = ancho * largo * cantidad * precio;
                        this.secondFormGroup.controls['totalCtrl'].setValue(total);
                    } else {
                        this.secondFormGroup.controls['totalCtrl'].setValue('0');
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                precio = value;
                this.secondFormGroup.controls['totalCtrl'].setValue('0');
            }
        });

        this.secondFormGroup.controls['cantidadCtrl'].valueChanges.subscribe((value) => {
            if (value) {
                try {
                    cantidad = parseInt(value);
                    console.log(cantidad)
                    if (ancho && largo && cantidad && precio) {
                        total = ancho * largo * cantidad * precio;
                        this.secondFormGroup.controls['totalCtrl'].setValue(total);
                    } else {
                        this.secondFormGroup.controls['totalCtrl'].setValue('0');
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                cantidad = value;
                this.secondFormGroup.controls['totalCtrl'].setValue('0');
            }
        });


    }

    cancelar() {
        this.dialogRef.close({
            res: "ok"
        });
    }

    findProductoByNombre(nombre: string): IProducto {
        return this.PRODUCTOS.find(producto => producto.nombre === nombre);
    }

    addCarrito() {
        let nombre = this.secondFormGroup.controls['nombreCtrl'].value;
        let producto = this.findProductoByNombre(nombre);
        if (producto) {
            let anchoVacio = this.secondFormGroup.controls['anchoCtrl'].value === '' || this.secondFormGroup.controls['anchoCtrl'].value === null;
            let largoVacio = this.secondFormGroup.controls['largoCtrl'].value === '' || this.secondFormGroup.controls['largoCtrl'].value === null;
            let cantidadVacia = this.secondFormGroup.controls['cantidadCtrl'].value === '' || this.secondFormGroup.controls['cantidadCtrl'].value === null;
            if (!anchoVacio && !largoVacio && !cantidadVacia) {
                if (parseFloat(this.secondFormGroup.controls['anchoCtrl'].value) > 0) {
                    if (parseFloat(this.secondFormGroup.controls['largoCtrl'].value) > 0) {
                        if (parseInt(this.secondFormGroup.controls['cantidadCtrl'].value) > 0) {
                            let item: item = {
                                id_producto: this.index,
                                nombre: producto.nombre,
                                tipo: producto.tipo,
                                dimensiones: {
                                    largo: parseFloat(this.secondFormGroup.controls['largoCtrl'].value),
                                    ancho: parseFloat(this.secondFormGroup.controls['anchoCtrl'].value)
                                },
                                cantidad: parseInt(this.secondFormGroup.controls['cantidadCtrl'].value),
                                precio_unitario: producto.precio,
                                total: parseFloat(this.secondFormGroup.controls['totalCtrl'].value)
                            }
                            this.productosCarrito.push(item);
                            this.dataSource = new MatTableDataSource(this.productosCarrito);
                            this.dataSource.paginator = this.paginator;
                            this.index++;

                            this.snackBarService.greenSnackBar('Se ha agregado el producto a Carrito');

                            this.resetCampos();
                        } else {
                            this.snackBarService.redSnackBar('La cantidad debe ser mayor a cero');
                            console.log('la cantidad debe ser mayor a cero')
                        }
                    } else {
                        this.snackBarService.redSnackBar('El largo debe ser mayor a cero');
                        console.log('el largo debe ser mayor a cero')
                    }
                } else {
                    this.snackBarService.redSnackBar('El ancho debe ser mayor a cero');
                    console.log('el ancho debe ser mayor a cero')
                }
            } else {
                this.snackBarService.redSnackBar("Se deben llenar todos los datos");
                console.log('se deben llenar todos los datos');
            }
        } else {
            this.snackBarService.redSnackBar("Favor de ingresar producto válido");
            console.log('ingresar producto valido')
        }
    }

    resetCampos() {
        this.secondFormGroup.controls['nombreCtrl'].setValue('');
        this.secondFormGroup.controls['anchoCtrl'].setValue('');
        this.secondFormGroup.controls['largoCtrl'].setValue('');
        this.secondFormGroup.controls['precioCtrl'].setValue('0');
        this.secondFormGroup.controls['cantidadCtrl'].setValue('');
        this.secondFormGroup.controls['totalCtrl'].setValue('0');
    }

    deleteItem(id: string) {
        const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
            data: 'Producto del Carrito',
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.res) {
                this.snackBarService.greenSnackBar('Se ha eliminado el producto de carrito');
                this.productosCarrito = this.productosCarrito.filter(item => item.id_producto !== parseInt(id));
                this.dataSource = new MatTableDataSource(this.productosCarrito);
                this.dataSource.paginator = this.paginator;

            } else {
                this.snackBarService.redSnackBar('Eliminación cancelada');
                console.log(`Exit on click outside`);
            }
        });
    }

    iniciarCotizacion(stepper: MatStepper) {
        if (this.productosCarrito.length === 0) {
            console.log("se debe agregar al menos un producto al carrito");
            this.secondFormGroup.setErrors(Validators.required);
        } else {
            let items: ICarrito[] = [];
            for (let i = 0; i < this.productosCarrito.length; i++) {
                items.push({
                    id_producto: this.findProductoByNombre(this.productosCarrito[i].nombre).id,
                    dimensiones: {
                        largo: this.productosCarrito[i].dimensiones.largo,
                        ancho: this.productosCarrito[i].dimensiones.ancho
                    },
                    cantidad: this.productosCarrito[i].cantidad,
                    subtotal: this.productosCarrito[i].total
                });
            }
            console.log(this.cliente);
            this.clienteService.editarClientePut(this.cliente).subscribe(res => {
                let total = 0;
                items.forEach(item => {
                    total += item.subtotal
                });
                this.cotizacion.id_usuario = 1;
                this.cotizacion.id_cliente = this.cliente.id;
                this.cotizacion.carrito = items;
                this.cotizacion.subtotal = total;
                this.cotizacion.total = total + (total * .16);
                this.cotizacion.estado = 'pendiente';
                stepper.next();
            });
        }
    }

    iniciarCliente() {
        this.cliente.nombre = this.firstFormGroup.controls['nombreCtrl'].value;
        this.cliente.telefono = this.firstFormGroup.controls['telCtrl'].value;
        this.cliente.correo = this.firstFormGroup.controls['correoCtrl'].value;
        this.cliente.direccion = this.firstFormGroup.controls['dirCtrl'].value;
        console.log(this.cliente)
    }

    editarCotizacion() {
        this.cotizacion.estado = this.checked ? 'completada' : 'pendiente';
        this.cotizacionService.editarCotizacionPut(this.cotizacion).subscribe(res => {
            console.log('Cotizacion editada con exito')
        });
        this.snackBarService.greenSnackBar('Cotización editada con éxito');
        this.dialogRef.close({
            res: "realizada"
        });
    }
}

function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Registros por página:';
    customPaginatorIntl.previousPageLabel = 'Página anterior'
    customPaginatorIntl.nextPageLabel = 'Página siguiente';
    customPaginatorIntl.getRangeLabel = (page: number, size: number, length: number): string => {
        length = Math.max(length, 0);
        const startIndex = page * size;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + size, length) : startIndex + page;
        return `${startIndex + 1} - ${endIndex} de ${length} registros`;
    };
    return customPaginatorIntl;
}