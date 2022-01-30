import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@let-it-roll/let-it-roll-shared';
@Component({
  selector: 'let-it-roll-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent {

  private selectedPlayerId: string | undefined;

  @Input() players?: Player[];
  @Input() ownerId = '';
  @Input() playerId = '';

  @Output() playerPromoted = new EventEmitter<string>();
  @Output() playerKicked = new EventEmitter<string>();

  setSelectedPlayer(playerId: string): void {
    this.selectedPlayerId = playerId;
  }

  kickSelectedPlayer(): void {
    if(this.selectedPlayerId) this.playerKicked.emit(this.selectedPlayerId);
  }

  promoteSelectedPlayer(): void {
    if(this.selectedPlayerId) this.playerPromoted.emit(this.selectedPlayerId);
  }

}
