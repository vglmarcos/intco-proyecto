import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCotizacionComponent } from './agregar-cotizacion/agregar-cotizacion.component';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';

@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class BuscarCotizacionComponent implements OnInit, AfterViewInit {
  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;
  private COTIZACIONES: ICotizacion[];

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'estado', 'total', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<ICotizacion>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public colorThemeService: ColorThemeService,
    public dialog: MatDialog,
    private cotizacionService: CotizacionService
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
      this.dataSource = new MatTableDataSource(this.COTIZACIONES);
      this.dataSource.paginator = this.paginator;
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

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(cotizacion: ICotizacion) {
    this.cotizacionService.eliminarClienteDelete(cotizacion).subscribe(res => {
      this.iniciarDatos();
    });
  }

  agregarCotizacion() {
    const dialogRef = this.dialog.open(AgregarCotizacionComponent, {
      data: 'datos',
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(`Dialog result: ${result.res}`);
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