import { ChampionRoll, Player } from '@let-it-roll/let-it-roll-shared';
import { createAction, props } from '@ngrx/store';

export const AppActions = {
    createRoom: createAction('[App] CREATE ROOM', props<{ nickname: string }>()),
    joinRoom: createAction("[App] JOIN ROOM", props<{ roomId: string, nickname: string }>()),
    leaveRoom: createAction("[App] LEAVE ROOM"),
    rollChampions: createAction("[App] ROLL CHAMPIONS"),
    rollChampion: createAction("[App] ROLL CHAMPION"),
    rollingChampions: createAction("[App] ROLLING CHAMPIONS"),
    rollingChampion: createAction("[App] ROLLING CHAMPION", props<{ playerId: string}>()),

    kickPlayer: createAction("[APP] KICK PLAYER", props<{ playerId: string }>()),
    assignOwner: createAction("[APP] ASSIGN OWNER", props<{ ownerId: string }>()),

    youAreKicked: createAction("[APP] YOU ARE KICKED"),
    playerKicked: createAction("[APP] PLAYER KICKED", props<{ playerId: string }>()),
    ownerAssigned: createAction("[APP] OWNER ASSIGNED", props<{ ownerId: string }>()),

    roomJoined: createAction("[App] ROOM JOINED", props<{ players: Player[], playerId: string, roomId: string, ownerId: string, rolls: ChampionRoll[] }>()),
    roomCreated: createAction("[App] ROOM CREATED", props<{ player: Player, roomId: string }>()),
    playerJoined: createAction("[App] PLAYER JOINED", props<{ player: Player }>()),
    playerLeft: createAction("[App] PLAYER LEFT", props<{ playerId: string, ownerId: string }>()),
    championsRolled: createAction("[App] CHAMPIONS ROLLED", props<{ rolls: ChampionRoll[] }>()),
    championRolled: createAction("[App] CHAMPION ROLLED", props<{ roll: ChampionRoll }>()),
}