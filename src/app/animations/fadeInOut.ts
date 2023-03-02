import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    // Transition between any two states
    transition('* <=> *', [
      // Events to apply
      // Defined style and animation function to apply
      // Config object with optional set to true to handle when element not yet added to the DOM
      query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
      // group block executes in parallel
      group([
        query(':enter', [
            style({ opacity: 0 }),//, transform: "translateX(-100%)" }), //apply default styles before animation starts
            animate("750ms ease-in-out", style({ opacity: 1 }))//, transform: "translateX(0)" })
        ], { optional: true }),
        query(':leave', [
            style({ opacity: 1 }),//, transform: "translateX(0)" }), //apply default styles before animation starts
            animate("600ms ease-in-out", style({ opacity: 0 })),//, transform: "translateX(-100%)" })
        ], { optional: true })
      ])
    ])
  ]);