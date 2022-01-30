import { ChampionPick, ChampionRoll, Classes, Lanes, Player, PlayerEntries } from "@let-it-roll/let-it-roll-shared";
import * as fs from 'fs';

const championsJSON = fs.readFileSync(__dirname + '/assets/champions.json', 'utf-8');
const Champions: Record<string,string> = JSON.parse(championsJSON);

const randomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1) + min)

export class Room {
    
    entries: PlayerEntries = {};

    ownerId: string;

    get players() : Player[] {
        return Object.values(this.entries).map(x => x.player)
    }

    get currentRolls() :  ChampionRoll[] {
        return Object.values(this.entries)
            .map(x => (<ChampionRoll>{ playerId: x.player.id, pick: x.pick}));
    }

    private availableLanes: string[] = Object.keys(Lanes);
    private availableClasses: string[] = Object.values(Classes);
    private availableChampions: string[] = Object.keys(Champions);

    constructor(owner: Player, private rerollCount = 4){
        this.entries[owner.id] = { player: owner, rerolls: rerollCount };
        this.ownerId = owner.id;
    }

    join(player: Player): boolean {
        if(Object.values(this.entries).find(x => x.player.nickname === player.nickname)) 
            return false;

        this.entries[player.id] = { player, rerolls: this.rerollCount };
        return true;
    }

    leave(playerId: string): void {
        delete this.entries[playerId];
        const players = this.players;
        if(playerId === this.ownerId && players.length) this.assignOwner(this.players[0].id);
    }

    kick(playerId: string): void{
        delete this.entries[playerId];
    }

    assignOwner(playerId: string): void {
        this.ownerId = playerId;
    }

    rollChampions(): ChampionRoll[] | undefined {
        this.resetRolls();

        const rolls: ChampionRoll[] = [];

        for(const playerId of Object.keys(this.entries)){
            const roll = this.rollChampion(playerId);
            if(roll) rolls.push(roll);
        }

        return rolls;
    }

    rollChampion(playerId: string): ChampionRoll | undefined {
        const entry = this.entries[playerId];

        if(entry.rerolls === 0) return;

        if(entry.pick)
            this.addPickToPool(entry.pick);

        const roll: ChampionRoll = {
            playerId: entry.player.id,
            pick: {
                championId: this.pickRandom(this.availableChampions),
                lane: this.pickRandom(this.availableLanes),
                class: this.pickRandom(this.availableClasses)
            }
        }

        this.removePickFromPool(roll.pick);

        entry.rerolls-=1; 
        entry.pick = roll.pick;

        return roll;
    }

    private resetRolls(): void {
        for(const id in this.entries){
            const entry = this.entries[id];
            if(!entry) continue;
            entry.rerolls = this.rerollCount;
            entry.pick = undefined;
        }
        this.availableLanes = Object.keys(Lanes);
        this.availableClasses = Object.values(Classes);
        this.availableChampions = Object.keys(Champions); 
    }

    private addPickToPool(pick: ChampionPick): void {
        this.availableChampions.push(pick.championId);
        this.availableClasses.push(pick.class);
        this.availableLanes.push(pick.lane);
    }

    private removePickFromPool(pick: ChampionPick): void {
        this.availableChampions = this.availableChampions.filter(x => x !== pick.championId);
        this.availableClasses = this.availableClasses.filter(x => x !== pick.class);
        this.availableLanes = this.availableLanes.filter(x => x !== pick.lane);
    }

    private pickRandom<T>(from: T[]): T{
        return from[randomInt(0, from.length - 1)]
    }
}