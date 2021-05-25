import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { IProducto } from 'src/app/models/IProducto';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

export interface tablaProveedores {
    id: number,
    nombre: string,
    tipo: string,
    precio: number,
}

@Component({
    selector: 'app-buscar-usuarios',
    templateUrl: './buscar-productos.component.html',
    styleUrls: ['./buscar-productos.component.css'],
    providers: [
        { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
    ]
})
export class BuscarProductosComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;
    private datosTabla: tablaProveedores[] = [];
    public PRODUCTOS: IProducto[] = [];

    displayedColumns: string[] = ['id', 'nombre', 'tipo', 'precio', 'eliminar', 'editar'];
    dataSource: MatTableDataSource<tablaProveedores>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public colorThemeService: ColorThemeService,
        public dialog: MatDialog,
        private productoService: ProductoService,
        public snackBarService: SnackBarService
    ) {
        this.iniciarDatos();
        this.colorThemeService.theme.subscribe((theme) => {
            this.actualTheme = theme;
            this.viewColor();
        });
    }

    ngOnInit() { }

    iniciarDatos() {
        this.productoService.obtenerProductosGet().subscribe(productos => {
            this.PRODUCTOS = productos;
            this.datosTabla = [];
            for (let i = 0; i < this.PRODUCTOS.length; i++) {
                this.datosTabla.push({
                    id: this.PRODUCTOS[i].id,
                    nombre: this.PRODUCTOS[i].nombre,
                    tipo: this.PRODUCTOS[i].tipo,
                    precio: this.PRODUCTOS[i].precio,
                });
            }
            this.dataSource = new MatTableDataSource(this.datosTabla);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onDelete(producto: tablaProveedores) {
        let prod = this.PRODUCTOS.find(prod => prod.id === producto.id);
        const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
            data: 'Producto',
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.res) {
                this.productoService.eliminarProductoDelete(prod).subscribe(res => {
                    this.snackBarService.greenSnackBar('El producto se borró con éxito.');
                    this.iniciarDatos();
                });
            } else {
                this.snackBarService.redSnackBar('Eliminación cancelada');
                console.log(`Exit on click outside`);
            }
        });

    }

    editarProducto(producto: tablaProveedores) {
      let prod = this.PRODUCTOS.find(prod => prod.id === producto.id)
        const dialogRef = this.dialog.open(EditarProductoComponent, {
          autoFocus: false,
          data: prod,
          width: '600px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.res) {
              this.snackBarService.greenSnackBar('El producto se editó con éxito.');
              this.iniciarDatos();
            }
          } else {
            console.log(`Exit on click outside`);
          }
        });
    }

    agregarProducto() {
        const dialogRef = this.dialog.open(AgregarProductoComponent, {
          autoFocus: false,
          width: '600px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.res) {
              this.snackBarService.greenSnackBar('El usuario se agregó con éxito.');
              this.iniciarDatos();
            }
          } else {
            console.log(`Exit on click outside`);
          }
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