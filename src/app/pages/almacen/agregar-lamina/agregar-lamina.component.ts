import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/api/proveedor/proveedor.service';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IProveedor } from 'src/app/models/IProveedor';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { LaminaService } from 'src/app/api/lamina/lamina.service';
import { ILamina } from 'src/app/models/ILamina';

@Component({
  selector: 'app-agregar-lamina',
  templateUrl: './agregar-lamina.component.html',
  styleUrls: ['./agregar-lamina.component.css']
})
export class AgregarLaminaComponent implements OnInit {

  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;

  public firstFormGroup: FormGroup;
  public PROVEEDORES: IProveedor[];

  public filteredOptions: Observable<IProveedor[]>;

  public lamina: ILamina = {
    nombre: '',
    id_proveedor: 0,
    cantidad: 0,
    ultima_fecha: new Date()
  };

  constructor(
    public dialogRef: MatDialogRef<AgregarLaminaComponent>,
    public dialog: MatDialog,
    public colorThemeService: ColorThemeService,
    private _formBuilder: FormBuilder,
    private laminaService: LaminaService,
    private proveedorService: ProveedorService,
    public snackBarService: SnackBarService
  ) {1

    this.actualizarDatos();
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

  actualizarDatos() {
    this.proveedorService.obtenerProveedoresGet().subscribe(proveedores => {
      this.PROVEEDORES = proveedores;
      this.filteredOptions = this.firstFormGroup.controls['provCtrl'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  private _filter(nombre: string): IProveedor[] {
    const filterValue = nombre.toLowerCase();

    return this.PROVEEDORES.filter(proveedor => proveedor.nombre.toLowerCase().includes(filterValue));
}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombreCtrl: ['', Validators.required],
      provCtrl: ['', Validators.required],
      cantCtrl: ['', Validators.required],
    });
  }

  guardarLamina() {
    if (!this.firstFormGroup.controls['nombreCtrl'].hasError('required') && !this.firstFormGroup.controls['provCtrl'].hasError('required')
      && !this.firstFormGroup.controls['cantCtrl'].hasError('required')) {
        console.log(this.firstFormGroup.controls['cantCtrl'].value);
      this.lamina.nombre = this.firstFormGroup.controls['nombreCtrl'].value;
      this.lamina.cantidad = this.firstFormGroup.controls['cantCtrl'].value;
      let pro = this.PROVEEDORES.find(prov => prov.nombre === this.firstFormGroup.controls['provCtrl'].value);
      this.lamina.id_proveedor = pro.id;

      this.laminaService.agregarLaminaPost(this.lamina).subscribe(res => {
      });
      this.snackBarService.greenSnackBar('Lamina creada con éxito');
      this.dialogRef.close({
        res: "realizada"
      });
    }
    else {
      this.snackBarService.redSnackBar('Favor de llenar todos los campos');
    }
  }

  cancelar() {
    this.dialogRef.close({
      res: "ok"
    });
  }

}
