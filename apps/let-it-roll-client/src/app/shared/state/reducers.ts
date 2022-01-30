import { ChampionRoll, Player } from "@let-it-roll/let-it-roll-shared";
import { createReducer, on } from "@ngrx/store";
import { AppActions } from "./actions";

//kick => clear roomId, players, rerolls, ownerId

export const PlayersReducer = createReducer(
    <Player[]> [],
    on(AppActions.roomCreated, (s, { player }) => [player]),
    on(AppActions.roomJoined, (s, { players }) => players),
    on(AppActions.leaveRoom, () => []),
    on(AppActions.youAreKicked, () => []),
    on(AppActions.playerJoined, (players, { player }) => [...players, player]),
    on(AppActions.playerLeft, (players, { playerId }) => players.filter(p => p.id !== playerId)),
    on(AppActions.playerKicked, (players, { playerId }) => players.filter(p => p.id !== playerId)),
)

export const RollsReducer = createReducer(
    <ChampionRoll[]>[],
    on(AppActions.championsRolled, (s, {rolls}) => rolls),
    on(AppActions.championRolled, (s, {roll}) => [...s.filter(x => x.playerId !== roll.playerId), roll]),
    on(AppActions.roomJoined, (s, { rolls }) => rolls),
    on(AppActions.leaveRoom, () => []),
    on(AppActions.youAreKicked, () => []),
)

export const RerollsReducer = createReducer(
    3,
    on(AppActions.championsRolled, () => 3),
    on(AppActions.rollChampion, (s) => s > 0 ? --s : s)
)

export const PlayerIdReducer = createReducer(
    <string | null> null,
    on(AppActions.roomCreated, (s, { player }) => player.id),
    on(AppActions.roomJoined, (s, { playerId }) => playerId),
)

export const OwnerIdReducer = createReducer(
    <string | null> null,
    on(AppActions.roomCreated, (s, { player }) => player.id),
    on(AppActions.roomJoined, (s, { ownerId }) => ownerId),
    on(AppActions.playerLeft, (s, { ownerId }) => ownerId),
    on(AppActions.ownerAssigned, (s, { ownerId }) => ownerId),
    on(AppActions.youAreKicked, () => null),
)

export const RoomIdReducer = createReducer(
    <string | null> null,
    on(AppActions.roomCreated, (s, { roomId }) => roomId),
    on(AppActions.roomJoined, (s, { roomId }) => roomId),
    on(AppActions.leaveRoom, () => null),
    on(AppActions.youAreKicked, () => null),
)