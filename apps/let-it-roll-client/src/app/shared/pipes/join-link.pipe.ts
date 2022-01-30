import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoomIdQueryParam } from '../../query-params';

@Pipe({ name: 'joinLink' })
export class JoinLinkPipe implements PipeTransform {

  transform(roomId: string): string {
    return `${document.location.origin}${environment.baseUrl?.length ? ('/' + environment.baseUrl) : ''}/#/?${RoomIdQueryParam}=${roomId}`;
  }

}
