import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { LaminaService } from 'src/app/api/lamina/lamina.service';
import { ILamina } from 'src/app/models/ILamina';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ProveedorService } from 'src/app/api/proveedor/proveedor.service';
import { IProveedor } from 'src/app/models/IProveedor';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { IProducto } from 'src/app/models/IProducto';
import { AgregarLaminaComponent } from 'src/app/pages/almacen/agregar-lamina/agregar-lamina.component';
import { EditarLaminaComponent } from 'src/app/pages/almacen/editar-lamina/editar-lamina.component';


export interface tablaLaminas {
  id: number,
  nombre: string,
  cantidad: number,
  nombre_proveedor: string,
  ultima_fecha: Date
}

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class AlmacenComponent implements OnInit {

  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;

  private LAMINAS: ILamina[];
  private datosTabla: tablaLaminas[] = [];
  private PROVEEDORES: IProveedor[];
  private PRODUCTOS: IProducto[];

  displayedColumns: string[] = ['id', 'nombre', 'cantidad', 'nombre_proveedor', 'ultima_fecha', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<tablaLaminas>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public colorThemeService: ColorThemeService,
    public dialog: MatDialog,
    public laminaService: LaminaService,
    public proveedorService: ProveedorService,
    public productoService: ProductoService,
    public snackBarService: SnackBarService
  ) { 

    this.iniciarDatos();

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

  ngOnInit(): void {
  }

  iniciarDatos() {
    this.laminaService.obtenerLaminasGet().subscribe(laminas => {
      this.LAMINAS = laminas;
      this.proveedorService.obtenerProveedoresGet().subscribe(proveedores => {
        this.PROVEEDORES = proveedores;

        this.datosTabla = [];

        for (let i = 0; i < this.LAMINAS.length; i++) {
          this.datosTabla.push({
            id: this.LAMINAS[i].id,
            nombre: this.LAMINAS[i].nombre,
            nombre_proveedor: this.buscarProveedorPorID(this.LAMINAS[i].id_proveedor).nombre,
            cantidad: this.LAMINAS[i].cantidad,
            ultima_fecha: this.LAMINAS[i].ultima_fecha
          });
        }

        this.dataSource = new MatTableDataSource(this.datosTabla);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });

    });
  }

  buscarProveedorPorID(id: number): IProveedor {
    return this.PROVEEDORES.find(proveedor => proveedor.id === id)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(lamina: ILamina){
    let lam = this.LAMINAS.find(lami => lami.id === lamina.id);
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
      data: 'Lamina',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.res) {
        this.laminaService.eliminarLaminaDelete(lam).subscribe(res => {
          this.onDeleteProductos(lam.nombre);
          this.snackBarService.greenSnackBar('Se ha eliminado la Lamina');
          this.iniciarDatos();
        });
      } else {
        this.snackBarService.redSnackBar('Eliminación cancelada');
        console.log(`Exit on click outside`);
      }
    });

  }

  onDeleteProductos(nomLam: string){
    this.productoService.obtenerProductosGet().subscribe(productos => {
      this.PRODUCTOS = productos;
      let productosLamnias = this.PRODUCTOS.filter(producto => producto.tipo === nomLam);
      for (let i = 0; i < productosLamnias.length; i++) {
        this.productoService.eliminarProductoDelete(productosLamnias[i]).subscribe(res =>{
        });
      }
    });
  }

  agregarLamina(){
    const dialogRef = this.dialog.open(AgregarLaminaComponent, {
      autoFocus: false,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.res === "realizada") {
          this.iniciarDatos();
        }
      } else {
        console.log(`Exit on click outside`);
      }
    });

  }

  anadirCantidad(){

  }

  EditarLamina(lamina: ILamina){
    let lam = this.LAMINAS.find(lami => lami.id === lamina.id);
    const dialogRef = this.dialog.open(EditarLaminaComponent, {
      autoFocus: false,
      data: lam,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.res === "realizada") {
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
