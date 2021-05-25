import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ProveedorService } from 'src/app/api/proveedor/proveedor.service';
import { IProveedor } from 'src/app/models/IProveedor';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';

export interface tablaProveedores {
  id: number,
  nombre: string,
  telefono: string,
  ubicacion: string
}

@Component({
  selector: 'app-buscar-proveedores',
  templateUrl: './buscar-proveedores.component.html',
  styleUrls: ['./buscar-proveedores.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class BuscarProveedoresComponent implements OnInit {

  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;
  private datosTabla: tablaProveedores[] = [];
  public PROVEEDORES: IProveedor[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'ubicacion', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<tablaProveedores>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public colorThemeService: ColorThemeService,
    public dialog: MatDialog,
    private proveedorService: ProveedorService,
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
    this.proveedorService.obtenerProveedoresGet().subscribe(proveedores => {
      this.PROVEEDORES = proveedores;
      this.datosTabla = [];
      for (let i = 0; i < this.PROVEEDORES.length; i++) {
        this.datosTabla.push({
          id: this.PROVEEDORES[i].id,
          nombre: this.PROVEEDORES[i].nombre,
          telefono: this.PROVEEDORES[i].telefono,
          ubicacion: this.PROVEEDORES[i].ubicacion
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

  onDelete(proveedor: tablaProveedores) {
    let prov = this.PROVEEDORES.find(prov => prov.id === proveedor.id);
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
      data: 'Proveedor',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.res) {
        this.proveedorService.eliminarProveedorDelete(prov).subscribe(res => {
          this.snackBarService.greenSnackBar('El proveedor se borró con éxito.');
          this.iniciarDatos();
        });
      } else {
        this.snackBarService.redSnackBar('Eliminación cancelada');
        console.log(`Exit on click outside`);
      }
    });
    
  }

  editarProveedor(proveedor: tablaProveedores) {
    let prov = this.PROVEEDORES.find(prov => prov.id === proveedor.id)
    const dialogRef = this.dialog.open(EditarProveedorComponent, {
      autoFocus: false,
      data: prov,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.res) {
          this.snackBarService.greenSnackBar('El proveedor se editó con éxito.');
          this.iniciarDatos();
        }
      } else {
        console.log(`Exit on click outside`);
      }
    });
  }

  agregarProveedor() {
    const dialogRef = this.dialog.open(AgregarProveedorComponent, {
      autoFocus: false,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.res) {
          this.snackBarService.greenSnackBar('El proveedor se agregó con éxito.');
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