export interface Player {
    id: string,
    nickname: string;
}

export interface ChampionRoll {
    playerId: string,
    pick: ChampionPick
}

export interface ChampionPick {
    championId: string,
    lane: string,
    class: string,
}

export interface PlayerEntry {
    player: Player,
    pick?: ChampionPick;
    rerolls: number;
}

export type PlayerEntries = Record<string, PlayerEntry>;