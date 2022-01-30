import { ChampionRoll, Player } from "@let-it-roll/let-it-roll-shared";

export interface AppState {
    roomId: string,
    playerId: string,
    rolls: ChampionRoll[];
    players: Player[];
    ownerId: string;
    rerolls: number
}