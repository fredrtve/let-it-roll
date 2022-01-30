import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from "rxjs";
import { RoomService } from "../../room.service";
import { AppActions } from "./actions";

@Injectable()
export class AppEffects {

    createRoom$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.createRoom),
        map(action => this.roomService.createRoom(action))
    ), {dispatch: false})

    joinRoom$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.joinRoom),
        map(action => this.roomService.joinRoom(action))
    ), {dispatch: false})

    leaveRoom$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.leaveRoom),
        map(action => this.roomService.leaveRoom(action))
    ), {dispatch: false})

    rollChampions$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.rollChampions),
        map(action => this.roomService.rollChampions(action))
    ), {dispatch: false})

    rollChampion$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.rollChampion),
        map(action => this.roomService.rollChampion())
    ), {dispatch: false})

    kickPlayer$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.kickPlayer),
        map(action => this.roomService.kickPlayer(action))
    ), {dispatch: false})

    assignOwner$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.assignOwner),
        map(action => this.roomService.assignOwner(action))
    ), {dispatch: false})

    constructor(
        private actions$: Actions,
        private roomService: RoomService
    ){}

}