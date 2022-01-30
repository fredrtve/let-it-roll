import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChampionPick, Player } from '@let-it-roll/let-it-roll-shared';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { newItemQueue } from '../shared/new-item-queue.operator';
import { AppActions } from '../shared/state/actions';
import { AppState } from '../shared/state/state';

interface ViewModel {
  players: Player[];
  picksMap: Record<string, ChampionPick>;
  roomId: string;
  rerolls: number;
  playerId: string;
  ownerId: string;
}

@Component({
  selector: 'let-it-roll-room-screen',
  templateUrl: './room-screen.component.html',
  styleUrls: ['./room-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomScreenComponent implements OnInit, OnDestroy {

  private leaveSub?: Subscription;


  vm$: Observable<ViewModel> = combineLatest({
    picksMap: this.store.select('rolls').pipe(
      newItemQueue,
      map(rolls => {
        const picksMap: Record<string, ChampionPick> = {};
        for(const roll of rolls) picksMap[roll.playerId] = roll.pick;
        return picksMap;
      })
    ),
    players: this.store.select("players"),
    ownerId: this.store.select("ownerId"),
    roomId: this.store.select("roomId"),
    rerolls: this.store.select("rerolls"),
    playerId: this.store.select("playerId")
  });

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select("roomId")
      .subscribe(roomId => roomId ? null : this.router.navigate(['']));
  }

  rollChampions(): void {
    this.store.dispatch(AppActions.rollChampions());
  }

  rollChampion(): void {
    this.store.dispatch(AppActions.rollChampion())
  }

  leaveRoom(): void {
    this.store.dispatch(AppActions.leaveRoom());
  }
  
  kickPlayer(playerId: string): void {
    this.store.dispatch(AppActions.kickPlayer({ playerId }))
  }

  assignOwner(ownerId: string): void {
    this.store.dispatch(AppActions.assignOwner({ ownerId }))
  }

  trackByPlayer = (index: number, entry: Player) => entry.id;

  ngOnDestroy(): void {
    this.leaveSub?.unsubscribe();
  }

}
