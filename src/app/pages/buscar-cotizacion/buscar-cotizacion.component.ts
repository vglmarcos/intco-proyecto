import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCotizacionComponent } from './agregar-cotizacion/agregar-cotizacion.component';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { ICliente } from 'src/app/models/ICliente';
import { EditarCotizacionComponent } from './editar-cotizacion/editar-cotizacion.component';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';

export interface tablaCotizaciones {
  id: number,
  nombre_cliente: string,
  fecha: Date,
  estado: string,
  total: number
}

@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class BuscarCotizacionComponent {
  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;
  private COTIZACIONES: ICotizacion[];
  private CLIENTES: ICliente[];
  private datosTabla: tablaCotizaciones[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'estado', 'total', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<tablaCotizaciones>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public colorThemeService: ColorThemeService,
    public dialog: MatDialog,
    private cotizacionService: CotizacionService,
    private clienteService: ClienteService,
    public snackBarService: SnackBarService
  ) {

    this.iniciarDatos();


    this.colorThemeService.theme.subscribe((theme) => {
      this.actualTheme = theme;
      this.viewColor();
    });
  }

  iniciarDatos() {
    this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
      this.COTIZACIONES = cotizaciones;
      this.clienteService.obtenerClientesGet().subscribe(clientes => {
        this.CLIENTES = clientes;

        this.datosTabla = [];

        for (let i = 0; i < this.COTIZACIONES.length; i++) {
          this.datosTabla.push({
            nombre_cliente: this.buscarClientePorID(this.COTIZACIONES[i].id_cliente).nombre,
            estado: this.COTIZACIONES[i].estado,
            fecha: this.COTIZACIONES[i].createdAt,
            id: this.COTIZACIONES[i].id,
            total: this.COTIZACIONES[i].total
          });
        }

        this.dataSource = new MatTableDataSource(this.datosTabla);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  buscarClientePorID(id: number): ICliente {
    return this.CLIENTES.find(cliente => cliente.id === id)
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

  onDelete(cotizacion: ICotizacion) {
    let cot = this.COTIZACIONES.find(coti => coti.id === cotizacion.id);
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
      data: 'Cotizacion',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.res) {
        this.cotizacionService.eliminarClienteDelete(cot).subscribe(res => {
          this.snackBarService.greenSnackBar('Se ha eliminado la cotizacion');
          this.iniciarDatos();
        });
      } else {
        this.snackBarService.redSnackBar('Eliminación cancelada');
        console.log(`Exit on click outside`);
      }
    });
  }

  
  editarCotizacion(cotizacion: ICotizacion) {
    let cot = this.COTIZACIONES.find(coti => coti.id === cotizacion.id)
    const dialogRef = this.dialog.open(EditarCotizacionComponent, {
      autoFocus: false,
      data: cot
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

  agregarCotizacion() {
    const dialogRef = this.dialog.open(AgregarCotizacionComponent, {
      data: 'datos',
      autoFocus: false
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