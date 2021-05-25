import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

export interface tablaProveedores {
    id: number,
    nombre: string,
    tipo: string,
    correo: string,
    telefono: string,
    usuario: string,
}

@Component({
    selector: 'app-buscar-usuarios',
    templateUrl: './buscar-usuarios.component.html',
    styleUrls: ['./buscar-usuarios.component.css'],
    providers: [
        { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
    ]
})
export class BuscarUsuariosComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;
    private datosTabla: tablaProveedores[] = [];
    public USUARIOS: IUsuario[] = [];

    displayedColumns: string[] = ['id', 'nombre', 'correo', 'telefono', 'usuario', 'tipo', 'eliminar', 'editar'];
    dataSource: MatTableDataSource<tablaProveedores>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public colorThemeService: ColorThemeService,
        public dialog: MatDialog,
        private usuarioService: UsuarioService,
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
        this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
            this.USUARIOS = usuarios;
            this.datosTabla = [];
            for (let i = 0; i < this.USUARIOS.length; i++) {
                this.datosTabla.push({
                    id: this.USUARIOS[i].id,
                    nombre: this.USUARIOS[i].nombre,
                    telefono: this.USUARIOS[i].telefono,
                    correo: this.USUARIOS[i].correo,
                    tipo: this.USUARIOS[i].tipo,
                    usuario: this.USUARIOS[i].usuario,
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

    onDelete(usuario: tablaProveedores) {
        let user = this.USUARIOS.find(user => user.id === usuario.id);
        const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
            data: 'Proveedor',
            autoFocus: false
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.res) {
                this.usuarioService.eliminarUsuarioDelete(user).subscribe(res => {
                    this.snackBarService.greenSnackBar('El usuario se borró con éxito.');
                    this.iniciarDatos();
                });
            } else {
                this.snackBarService.redSnackBar('Eliminación cancelada');
                console.log(`Exit on click outside`);
            }
        });

    }

    editarUsuario(usuario: tablaProveedores) {
        let user = this.USUARIOS.find(user => user.id === usuario.id)
        const dialogRef = this.dialog.open(EditarUsuarioComponent, {
          autoFocus: false,
          data: user,
          width: '600px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.res) {
              this.snackBarService.greenSnackBar('El usuario se editó con éxito.');
              this.iniciarDatos();
            }
          } else {
            console.log(`Exit on click outside`);
          }
        });
    }

    agregarUsuario() {
        const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
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