import { ChampionRoll } from "@let-it-roll/let-it-roll-shared";
import { Observable, merge, interval, of} from "rxjs";
import { startWith, pairwise, switchMap, delay, take, map, scan } from "rxjs/operators";

export function newItemQueue<T>(source$: Observable<T[]>): Observable<T[]> {

    return source$.pipe(
        startWith([]),
        pairwise(),
        switchMap(([prev, curr])=> {

        if(curr.length === 0) return of([]);

        const newItems: T[] = [];
        const oldItems: T[] = [];

        for(const roll of curr){
            let isNew = true;
            for(const prevRoll of prev){
            if(roll === prevRoll) isNew = false;
            }
            if(isNew) newItems.push(roll);
            else oldItems.push(roll);
        }

        if(newItems.length === 0) return of(oldItems);

        return merge(
            of(null),
            of(newItems[0]).pipe(delay(50)),
            interval(2000).pipe(
                    take(newItems.length - 1),
                    map(x => newItems[x + 1]),
            )
            ).pipe(  
            scan((acc, curr) => curr == null ? acc : [...acc, curr], oldItems),
            )     
        })
    )

}