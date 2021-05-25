import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { ICliente } from 'src/app/models/ICliente';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/shared/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  color = 'primary';
  public actualTheme: string;
  dark = 'dark';
  light = 'light';
  public colorMode: string;

  public firstFormGroup: FormGroup;

  public cliente: ICliente = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EditarClientesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ICliente,
    public colorThemeService: ColorThemeService,
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
    public snackBarService: SnackBarService
  ) {

    this.cliente = this.data;

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
    this.firstFormGroup = this._formBuilder.group({
      nombreCtrl: ['', Validators.required],
      telCtrl: ['', Validators.required],
      correoCtrl: ['', [Validators.required, Validators.email]],
      dirCtrl: ['', Validators.required],
    });

    this.clienteService.obtenerClientesGet().subscribe(clientes => {
      console.log(this.data)
      this.cliente = clientes.find(cliente => cliente.id === this.data.id);
      console.log(this.cliente);
      this.firstFormGroup.controls['nombreCtrl'].setValue(this.cliente.nombre);
      this.firstFormGroup.controls['correoCtrl'].setValue(this.cliente.correo);
      this.firstFormGroup.controls['telCtrl'].setValue(this.cliente.telefono);
      this.firstFormGroup.controls['dirCtrl'].setValue(this.cliente.direccion);
    });
  }

  guardarCliente() {
    if(!this.firstFormGroup.controls['nombreCtrl'].hasError('required') && !this.firstFormGroup.controls['correoCtrl'].hasError('required') 
      && !this.firstFormGroup.controls['correoCtrl'].hasError('email') && !this.firstFormGroup.controls['telCtrl'].hasError('required') 
      && !this.firstFormGroup.controls['dirCtrl'].hasError('required')){
      console.log(this.firstFormGroup.controls['nombreCtrl'].hasError('required'))
      this.cliente.nombre = this.firstFormGroup.controls['nombreCtrl'].value;
      this.cliente.telefono = this.firstFormGroup.controls['telCtrl'].value;
      this.cliente.correo = this.firstFormGroup.controls['correoCtrl'].value;
      this.cliente.direccion = this.firstFormGroup.controls['dirCtrl'].value;
  
      this.clienteService.editarClientePut(this.cliente).subscribe(res => {
  
      });
      this.snackBarService.greenSnackBar('Cliente editado con éxito');
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
