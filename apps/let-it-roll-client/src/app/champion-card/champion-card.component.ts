import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChampionPick, Player } from '@let-it-roll/let-it-roll-shared';
import { cardAnimation } from '../shared/animations/card-animation';

@Component({
  selector: 'let-it-roll-champion-card',
  templateUrl: './champion-card.component.html',
  styleUrls: ['./champion-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardAnimation ]
})
export class ChampionCardComponent {
  
  @Input() pick: ChampionPick | undefined;
  @Input() player: Player | undefined;
  @Input() numOfRerolls: number | undefined;

  @Output() reroll = new EventEmitter<boolean>();

  rerollChampion(): void {
    if(this.numOfRerolls) this.reroll.emit(true)
  }

}
