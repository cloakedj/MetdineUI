import{
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes
} from '@angular/animations';

export const fader =
trigger('routeAnimations',[
    transition('* <=> *',[
        query(':enter, :leave', [
            style({
                position : 'absolute',
                left : 0,
                width: '100%',
                opacity : 0,
                transform: 'translateY(100%)',

            })
        ]),
        query(':enter',[
            animate('600ms ease'),
            style({opacity :1, transform : 'translateY(0)'})
        ]),
    ]),
]);