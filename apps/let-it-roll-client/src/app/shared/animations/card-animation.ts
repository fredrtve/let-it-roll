import { animate, state, style, transition, trigger } from "@angular/animations";

export const cardAnimation = trigger('cardAnimation', [
    state('hidden', style({
        transform: 'rotate(0deg) rotateY(0deg) translate(0px, -1000px) scale(0.01)', 
        opacity: 0
    })),
    state('visible', style({
        transform: 'rotate(-3600deg) rotateY(-3600deg) translate(0px, 0px) scale(1)', 
        opacity: 1
    })),
    transition('hidden => visible', animate(2000)),
    transition('visible => hidden', animate(2))
])