import { Pipe, PipeTransform } from '@angular/core';
import Champions from '../../../assets/champions.json';

@Pipe({name: 'championName'})
export class ChampionNamePipe implements PipeTransform {

  transform(championId: string): string {
    const id = championId.charAt(0).toUpperCase() + championId.slice(1);
    return (<Record<string,string>> Champions)[id];
  }

}
