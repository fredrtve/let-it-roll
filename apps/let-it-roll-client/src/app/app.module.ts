import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChampionCardComponent } from './champion-card/champion-card.component';
import { JoinScreenComponent } from './join-screen/join-screen.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { RoomScreenComponent } from './room-screen/room-screen.component';
import { ChampionImagePipe } from './shared/pipes/champion-image.pipe';
import { ChampionNamePipe } from './shared/pipes/champion-name.pipe';
import { JoinLinkPipe } from './shared/pipes/join-link.pipe';
import { AppEffects } from './shared/state/effects';
import { OwnerIdReducer, PlayerIdReducer, PlayersReducer, RerollsReducer, RollsReducer, RoomIdReducer } from './shared/state/reducers';

@NgModule({
  declarations: [
    AppComponent, 
    ChampionCardComponent, 
    ChampionImagePipe, 
    ChampionNamePipe, 
    JoinScreenComponent, 
    RoomScreenComponent, 
    PlayerListComponent, JoinLinkPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      playerId: PlayerIdReducer,
      players: PlayersReducer,
      roomId: RoomIdReducer,
      rolls: RollsReducer,
      rerolls: RerollsReducer,
      ownerId: OwnerIdReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
    ClipboardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatBadgeModule,
    MatChipsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
