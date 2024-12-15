import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LugaresModule } from './components/lugares.module';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, IonicModule.forRoot(), LugaresModule, RouterModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}


