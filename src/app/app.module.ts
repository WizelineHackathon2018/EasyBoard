import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { BlockersComponent } from './blockers/blockers.component';
import { RemainingComponent } from './remaining/remaining.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client',      component: ClientComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientComponent,
    BlockersComponent,
    RemainingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
