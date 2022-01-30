import { ChampionRoll, Player } from "./interfaces";

export const JoinRoomEvent = "JOIN ROOM";
export interface JoinRoomEvent { roomId: string, nickname: string };

export const CreateRoomEvent = "CREATE ROOM";
export interface CreateRoomEvent { nickname: string };

export const LeaveRoomEvent = "LEAVE ROOM";
export interface LeaveRoomEvent { };

export const RollChampionsEvent = "ROLL CHAMPIONS";
export interface RollChampionsEvent {};

export const RollChampionEvent = "ROLL CHAMPION";
export interface RollChampionEvent {};

export const RoomJoinedEvent = "ROOM JOINED";
export interface RoomJoinedEvent { players: Player[]; playerId: string; ownerId: string, roomId: string; rolls: ChampionRoll[] };

export const PlayerJoinedEvent = "PLAYER JOINED";
export interface PlayerJoinedEvent {  player: Player;  };

export const PlayerLeftEvent = "PLAYER LEFT";
export interface PlayerLeftEvent { playerId: string, ownerId: string };

export const KickPlayerEvent = "KICK PLAYER";
export interface KickPlayerEvent { playerId: string };

export const PlayerKickedEvent = "PLAYER KICKED";
export interface PlayerKickedEvent { playerId: string };

export const AssignOwnerEvent = "ASSIGN OWNER";
export interface AssignOwnerEvent { ownerId: string };

export const OwnerAssignedEvent = "OWNER ASSIGNED";
export interface OwnerAssignedEvent { ownerId: string };

export const RoomNotFoundEvent = "ROOM NOT FOUND";
export interface RoomNotFoundEvent { };

export const NicknameNotAvailableEvent = "NICKNAME NOT AVAILABLE EVENT";
export interface NicknameNotAvailableEvent { };

export const RoomCreatedEvent = "ROOM CREATED";
export interface RoomCreatedEvent { player: Player, roomId: string };

export const ChampionsRolledEvent = "CHAMPIONS ROLLED";
export interface ChampionsRolledEvent { rolls: ChampionRoll[] }

export const ChampionRolledEvent = "CHAMPION ROLLED";
export interface ChampionRolledEvent { roll: ChampionRoll }

