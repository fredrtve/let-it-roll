import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomScreenComponent } from './room-screen/room-screen.component';
import { JoinScreenComponent } from './join-screen/join-screen.component';

const routes: Routes = [
  { path: '', component: JoinScreenComponent },
  { path: 'room', component: RoomScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
