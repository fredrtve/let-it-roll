import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs';
import { RoomIdQueryParam } from '../query-params';
import { RoomService } from '../room.service';
import { AppState } from '../shared/state/state';

@Component({
  selector: 'let-it-roll-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinScreenComponent implements OnInit {

  roomId: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.queryParams[RoomIdQueryParam];
    this.store.select("roomId").pipe(filter(x => x != null), first())
      .subscribe(() => this.goToRoom());
  } 

  enterRoom(nickname: string): void {
    if(!this.roomId) this.roomService.createRoom({nickname});
    else this.roomService.joinRoom({roomId: this.roomId, nickname});
  }

  private goToRoom(){
    this.router.navigate(["room"]);
  }

}