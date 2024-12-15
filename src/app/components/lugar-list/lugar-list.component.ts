import { Component, OnInit } from '@angular/core';
import { LugarService, Lugar } from '../../services/lugar.service';
import { ModalController, AlertController } from '@ionic/angular';
import { LugarFormComponent } from '../lugar-form/lugar-form.component';


@Component({
  selector: 'app-lugar-list',
  templateUrl: './lugar-list.component.html',
  styleUrls: ['./lugar-list.component.scss'],
})
export class LugarListComponent implements OnInit {

  lugares: Lugar[] = [];

  constructor (
    private lugarService: LugarService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadLugar();
  }

  loadLugar() {
    this.lugarService.getLugares().subscribe(data => {
      this.lugares = data;
    });
  }

  async addLugar() {
    const modal = await this.modalController.create({
      component: LugarFormComponent
    });
    modal.onDidDismiss().then(() => {
      this.loadLugar();
    });
    return await modal.present();
  }

  async editLugar(lugar: Lugar) {
    const modal = await this.modalController.create({
      component: LugarFormComponent,
      componentProps: { lugar }
    });
    modal.onDidDismiss().then(() => {
      this.loadLugar();
    });
    return await modal.present();
  }

  async deleteLugar(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.lugarService.deleteLugar(id).subscribe(() => {
              this.loadLugar();
            });
          },
        },
      ],
    });

    await alert.present();
  
  }

}