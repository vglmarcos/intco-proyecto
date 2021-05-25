import { Component, OnInit, Inject } from '@angular/core';
import { ColorThemeService } from 'src/app/services/color-theme.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';

@Component({
    selector: 'app-editar-usuario',
    templateUrl: './editar-usuario.component.html',
    styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {

    public color = 'primary';
    public actualTheme: string;
    public dark = 'dark';
    public light = 'light';
    public colorMode: string;

    public editarUsuarioFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditarUsuarioComponent>,
        public dialog: MatDialog,
        public colorThemeService: ColorThemeService,
        private _formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        @Inject(MAT_DIALOG_DATA) public usuario: IUsuario,
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
        this.editarUsuarioFormGroup = this._formBuilder.group({
            nombreCtrl: [this.usuario.nombre, Validators.required],
            tipoCtrl: [this.usuario.tipo, Validators.required],
            correoCtrl: [this.usuario.correo, [Validators.required, Validators.email]],
            telefonoCtrl: [this.usuario.telefono, Validators.required],
            usuarioCtrl: [this.usuario.usuario, Validators.required],
            contraCtrl: [this.usuario.contra, Validators.required],
        });
    }

    cancelar() {
        this.dialogRef.close({
            res: false
        });
    }

    editarUsuario() {
        if(!this.editarUsuarioFormGroup.hasError('required') && !this.editarUsuarioFormGroup.controls['correoCtrl'].hasError('email')) {
            this.usuario.nombre = this.editarUsuarioFormGroup.controls['nombreCtrl'].value;
            this.usuario.tipo = this.editarUsuarioFormGroup.controls['tipoCtrl'].value;
            this.usuario.correo = this.editarUsuarioFormGroup.controls['correoCtrl'].value;
            this.usuario.telefono = this.editarUsuarioFormGroup.controls['telefonoCtrl'].value;
            this.usuario.usuario = this.editarUsuarioFormGroup.controls['usuarioCtrl'].value;
            this.usuario.contra = this.editarUsuarioFormGroup.controls['contraCtrl'].value;
            this.usuarioService.editarUsuarioPut(this.usuario).subscribe(res => {
                this.dialogRef.close({
                    res: true
                });
            });
        }
    }
}