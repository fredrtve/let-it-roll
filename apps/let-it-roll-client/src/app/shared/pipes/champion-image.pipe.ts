import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'championImage'})
export class ChampionImagePipe implements PipeTransform {

  transform(championId: string): string {
    const id = championId.charAt(0).toUpperCase() + championId.slice(1);
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;
  }

}
