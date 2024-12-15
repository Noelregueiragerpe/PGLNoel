import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExploradoService } from '../../services/explorado.service';
import { UsuarioService } from '../../services/usuario.service';
import { LugarService } from '../../services/lugar.service';
import { Explorado } from '../../services/explorado.service';
import { Usuario } from '../../services/usuario.service';
import { Lugar } from '../../services/lugar.service';

@Component({
  selector: 'app-explorado-form',
  templateUrl: './explorado-form.component.html',
  styleUrls: ['./explorado-form.component.scss'],
})
export class ExploradoFormComponent implements OnInit {
  @Input() explorado?: Explorado;
  exploradoForm!: FormGroup;
  usuarios: Usuario[] = [];
  lugares: Lugar[] = [];

  constructor(
    private exploradoService: ExploradoService,
    private usuarioService: UsuarioService,
    private lugarService: LugarService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.exploradoForm = this.formBuilder.group({
      id_usuario: [this.explorado?.id.idUsuario || '', Validators.required],  // Asegúrate de usar el nombre correcto
      id_lugar: [this.explorado?.id.idLugar || '', Validators.required],      // Asegúrate de usar el nombre correcto
      favorito: [this.explorado?.favorito || false, Validators.required]
    });

    this.loadUsuarios();
    this.loadLugares();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }


  async addExplorado() {
    const modal = await this.modalController.create({
      component: ExploradoFormComponent,
    });}

  loadLugares() {
    this.lugarService.getLugares().subscribe((lugares) => {
      this.lugares = lugares;
    });
  }
  saveExplorado() {
    const data = this.exploradoForm.value;
  
    if (this.explorado) {
      // Si estamos actualizando el explorado
      const exploradoActualizado: Explorado = {
        ...this.explorado,
        id: {
          idUsuario: data.id_usuario,
          idLugar: data.id_lugar,
        },
        favorito: data.favorito,
      };
  
      this.exploradoService.updateExplorado(this.explorado.id.idUsuario, this.explorado.id.idLugar, this.explorado).subscribe(
        () => {
          this.modalController.dismiss(true);
        },
        (error) => {
          console.error('Error al actualizar explorado:', error);
        }
      );
    } else {
      // Si estamos creando un nuevo explorado
      const nuevoExplorado: Explorado = {
        id: {
          idUsuario: data.id_usuario,
          idLugar: data.id_lugar,
        },
        favorito: data.favorito,
      };
  
      this.exploradoService.addExplorado(nuevoExplorado).subscribe(
        () => {
          this.modalController.dismiss(true);
        },
        (error) => {
          console.error('Error al crear explorado:', error);
        }
      );
    }
  }
  

  dismiss() {
    this.modalController.dismiss();
  }
}
