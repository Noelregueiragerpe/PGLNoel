import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LugarFormComponent } from './lugar-form/lugar-form.component';
import { LugarListComponent } from './lugar-list/lugar-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { ExploradoFormComponent } from './explorado-form/explorado-form.component';
import { ExploradoListComponent } from './explorado-list/explorado-list.component';


@NgModule({
  declarations: [
    LugarFormComponent,
    LugarListComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    ExploradoFormComponent,
    ExploradoListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LugarFormComponent,
    LugarListComponent,
    UsuarioFormComponent,
    UsuarioListComponent, 
    ExploradoFormComponent,
    ExploradoListComponent
  ],
})
export class LugaresModule {}
