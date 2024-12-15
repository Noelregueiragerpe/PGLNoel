// ingrediente-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  @Input() usuario?: Usuario;
  usuarioForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nombre: [this.usuario?.nombre || '', Validators.required],
      correo: [this.usuario?.correo || '', Validators.required],
      contrasena: [this.usuario?.contrasena || '', Validators.required],
    });
  }

  saveUsuario() {
    const data = this.usuarioForm.value;

    if (this.usuario) {
      // Editar usuario existente
      const usuarioActualizado: Usuario = {
        ...this.usuario,
        ...data,
      };

      this.usuarioService.updateUsuario(usuarioActualizado).subscribe(() => {
        this.modalController.dismiss(true);
      });
    } else {
      // Crear nuevo usuario
      this.usuarioService.addUsuario(data).subscribe(() => {
        this.modalController.dismiss(true);
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
