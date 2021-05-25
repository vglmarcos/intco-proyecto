import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { ICliente } from 'src/app/models/ICliente';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { EditarClientesComponent } from 'src/app/pages/buscar-clientes/editar-clientes/editar-clientes.component';

export interface tablaClientes {
  id: number,
  nombre_cliente: string,
  telefono: string,
  correo: string,
  direccion: string
}

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class BuscarClientesComponent {
  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;
  private CLIENTES: ICliente[];
  public COTIZACIONES: ICotizacion[];
  private datosTabla: tablaClientes[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'correo', 'direccion', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<tablaClientes>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public colorThemeService: ColorThemeService,
    public dialog: MatDialog,
    public cotizacionService: CotizacionService,
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
    this.clienteService.obtenerClientesGet().subscribe(clientes => {
      this.CLIENTES = clientes;

      this.datosTabla = [];

      for (let i = 0; i < this.CLIENTES.length; i++) {
        this.datosTabla.push({
          id: this.CLIENTES[i].id,
          nombre_cliente: this.CLIENTES[i].nombre,
          telefono: this.CLIENTES[i].telefono,
          correo: this.CLIENTES[i].correo,
          direccion: this.CLIENTES[i].direccion
        });
      }

      this.dataSource = new MatTableDataSource(this.datosTabla);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  onDelete(cliente: ICliente) {
    let cli = this.CLIENTES.find(clien => clien.id === cliente.id);
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
      data: 'Cliente',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.res) {
        this.clienteService.eliminarClienteDelete(cli).subscribe(res => {
          this.onDeleteCotizacion(cli.id);
          this.snackBarService.greenSnackBar('Se ha eliminado el Cliente');
          this.iniciarDatos();
        });
      } else {
        this.snackBarService.redSnackBar('Eliminación cancelada');
        console.log(`Exit on click outside`);
      }
    });
  }

  onDeleteCotizacion(idCli: number){
    this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
      this.COTIZACIONES = cotizaciones;
      let cotizacionesCliente = this.COTIZACIONES.filter(cotizacion => cotizacion.id_cliente === idCli);
      for (let i = 0; i < cotizacionesCliente.length; i++){
        this.cotizacionService.eliminarCotizacionDelete(cotizacionesCliente[i]).subscribe(res => {
        });
      }
    });
  }

  editarClientes(cliente: ICliente) {
    let cli = this.CLIENTES.find(clien => clien.id === cliente.id)
    const dialogRef = this.dialog.open(EditarClientesComponent, {
      autoFocus: false,
      data: cli,
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