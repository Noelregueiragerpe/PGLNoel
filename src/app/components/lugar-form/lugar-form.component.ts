// plato-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { LugarService, Lugar } from '../../services/lugar.service';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.scss'],
})
export class LugarFormComponent implements OnInit {
  @Input() lugar?: Lugar;
  lugarForm!: FormGroup;
  usuariosDisponibles: Usuario[] = [];
  
  categoriasDisponibles: string[] = [
    'Acción',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia Ficción',
    'Fantasía',
    'Documental',
    'Romance'
  ];
  
  constructor(
    private lugarService: LugarService,
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadUsuarios();

    this.lugarForm = this.formBuilder.group({
      nombre: [this.lugar?.nombre || '', Validators.required],
      ciudad: [this.lugar?.ciudad || '', Validators.required],
      coordenadasx: [this.lugar?.coordenadasx || '', [Validators.required]],
      coordenadasy: [this.lugar?.coordenadasy ||  '', [Validators.required]],
      categoria: [this.lugar?.categoria ||  '', [Validators.required]]
    });
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios) => {
      this.usuariosDisponibles = usuarios;
    });
  }

  saveLugar() {
    const data = this.lugarForm.value;

    if (this.lugar) {
      // Editar lugar existente
      const lugarActualizado: Lugar = {
        ...this.lugar,
        ...data,
      };

      this.lugarService.updateLugar(lugarActualizado).subscribe(() => {
        this.modalController.dismiss(true);
      });
    } else {
      // Crear nuevo lugar
      this.lugarService.addLugar(data).subscribe(() => {
        this.modalController.dismiss(true);
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
