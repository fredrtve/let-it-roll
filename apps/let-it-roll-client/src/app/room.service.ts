import { Injectable } from "@angular/core";
import { AssignOwnerEvent, ChampionRolledEvent, ChampionsRolledEvent, CreateRoomEvent, JoinRoomEvent, KickPlayerEvent, LeaveRoomEvent, OwnerAssignedEvent, PlayerJoinedEvent, PlayerKickedEvent, PlayerLeftEvent, RollChampionEvent, RollChampionsEvent, RoomCreatedEvent, RoomJoinedEvent } from "@let-it-roll/let-it-roll-shared";
import { Store } from "@ngrx/store";
import { delay, finalize, first, interval, of, take } from "rxjs";
import { io } from "socket.io-client";
import { environment } from "../environments/environment";
import { AppActions } from "./shared/state/actions";
import { AppState } from "./shared/state/state";

@Injectable({ providedIn: "root" })
export class RoomService {
    
    private socket = io(environment.socketUrl);

    constructor(private store: Store<AppState>){ 
        this.connect(); 
    }

    createRoom(event: CreateRoomEvent): void {
        this.socket.emit(CreateRoomEvent, event);
    }

    joinRoom(event: JoinRoomEvent): void {
        this.socket.emit(JoinRoomEvent, event);
    }

    leaveRoom(event: LeaveRoomEvent): void {
        this.socket.emit(LeaveRoomEvent, event);
    }

    kickPlayer(event: KickPlayerEvent): void {
        this.socket.emit(KickPlayerEvent, event)
    }

    assignOwner(event: AssignOwnerEvent): void {
        this.socket.emit(AssignOwnerEvent, event)
    }

    rollChampions(event: RollChampionsEvent): void {
        this.socket.emit(RollChampionsEvent, event);
    }    
    
    rollChampion(): void {
        this.socket.emit(RollChampionEvent);
    }

    private connect(){
        this.socket.on(RoomCreatedEvent, (event: RoomCreatedEvent) => {
            this.store.dispatch(AppActions.roomCreated(event))
        });

        this.socket.on(RoomJoinedEvent, (event: RoomJoinedEvent) => {
            this.store.dispatch(AppActions.roomJoined(event))
        });

        this.socket.on(ChampionsRolledEvent, (event: ChampionsRolledEvent) => {
            this.store.dispatch(AppActions.championsRolled(event))
        });

        this.socket.on(ChampionRolledEvent, (event: ChampionRolledEvent) => {
            this.store.dispatch(AppActions.championRolled(event))
        });
        this.socket.on(PlayerJoinedEvent, (event: PlayerJoinedEvent) => {
            this.store.dispatch(AppActions.playerJoined(event))
        })

        this.socket.on(PlayerLeftEvent, (event: PlayerLeftEvent) => {
            this.store.dispatch(AppActions.playerLeft(event))
        })

        this.socket.on(PlayerKickedEvent, (event: PlayerKickedEvent) => {
            this.store.select("playerId").pipe(first()).subscribe(playerId => {
                if(playerId === event.playerId)
                    this.store.dispatch(AppActions.youAreKicked())
                else
                    this.store.dispatch(AppActions.playerKicked(event))
            });
        })

        this.socket.on(OwnerAssignedEvent, (event: OwnerAssignedEvent) => {
            this.store.dispatch(AppActions.ownerAssigned(event))
        })
    }
}
