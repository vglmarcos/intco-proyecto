import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';

@Component({
    selector: 'app-agregar-usuario',
    templateUrl: './agregar-usuario.component.html',
    styleUrls: ['./agregar-usuario.component.css']
})

export class AgregarUsuarioComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;

    public usuario: IUsuario;

    public agregarUsuarioFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AgregarUsuarioComponent>,
        public dialog: MatDialog,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
    ) {
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

    ngOnInit() {
        this.agregarUsuarioFormGroup = this._formBuilder.group({
            nombreCtrl: ['', Validators.required],
            tipoCtrl: ['', Validators.required],
            correoCtrl: ['', [Validators.required, Validators.email]],
            telefonoCtrl: ['', Validators.required],
            usuarioCtrl: ['', Validators.required],
            contraCtrl: ['', Validators.required],
        });
    }

    cancelar() {
        this.dialogRef.close({
            res: false
        });
    }

    agregarUsuario() {
        if(!this.agregarUsuarioFormGroup.hasError('required') && !this.agregarUsuarioFormGroup.controls['correoCtrl'].hasError('email')) {
            this.usuario = {
                nombre: this.agregarUsuarioFormGroup.controls['nombreCtrl'].value,
                tipo: this.agregarUsuarioFormGroup.controls['tipoCtrl'].value,
                correo: this.agregarUsuarioFormGroup.controls['correoCtrl'].value,
                telefono: this.agregarUsuarioFormGroup.controls['telefonoCtrl'].value,
                usuario: this.agregarUsuarioFormGroup.controls['usuarioCtrl'].value,
                contra: this.agregarUsuarioFormGroup.controls['contraCtrl'].value,
            };
            console.log(this.usuario)
            this.usuarioService.agregarUsuarioPost(this.usuario).subscribe(res => {
                this.dialogRef.close({
                    res: true
                });
            });
        }
    }
}