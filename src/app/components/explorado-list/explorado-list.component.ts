import { Component, OnInit } from '@angular/core';
import { ExploradoService } from '../../services/explorado.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ExploradoFormComponent } from '../explorado-form/explorado-form.component';

export interface Explorado {
  id: {
    idUsuario: number;
    idLugar: number;
  };
  favorito: boolean;
  nombre_usuario?: string; // Nombre del usuario
  nombre_lugar?: string;   // Nombre del lugar
}

@Component({
  selector: 'app-explorado-list',
  templateUrl: './explorado-list.component.html',
  styleUrls: ['./explorado-list.component.scss'],
})
export class ExploradoListComponent implements OnInit {
  explorados: Explorado[] = [];

  constructor(
    private exploradoService: ExploradoService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadExplorados();
  }

  loadExplorados() {
    this.exploradoService.getExplorados().subscribe((explorados) => {
      this.explorados = explorados;
    });
  }

  async addExplorado() {
    const modal = await this.modalController.create({
      component: ExploradoFormComponent,
    });

    modal.onDidDismiss().then(() => {
      this.loadExplorados();
    });

    return await modal.present();
  }

  async editExplorado(explorado: Explorado) {
    const modal = await this.modalController.create({
      component: ExploradoFormComponent,
      componentProps: { explorado },
    });

    modal.onDidDismiss().then(() => {
      this.loadExplorados();
    });

    return await modal.present();
  }

  async deleteExplorado(idUsuario: number, idLugar: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este explorado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.exploradoService.deleteExplorado(idUsuario, idLugar).subscribe(() => {
              this.loadExplorados();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
