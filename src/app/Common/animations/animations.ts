import { trigger, state, style, transition, animate, stagger, query } from "@angular/animations";

export let fadeInOut = trigger("fadeInOut", [
  state("void", style({ opacity: 0 })),
  state("*", style({ opacity: 1 })),
  transition(":enter", animate("1000ms ease-out")),
  // transition(":leave", animate("1000ms ease-in")),
]);

export let listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query(":enter", [style({ opacity: 0 }), stagger(100, [animate("0.3s", style({ opacity: 1 }))])], { optional: true }),
  ]),
]);

export let menuList = trigger("menuList", [
  transition("* => *", [
    query(
      ":enter",
      [
        style({ opacity: 0, transform: "translateX(-100%)" }),
        stagger(100, [animate("1s ease-out", style({ opacity: 1, transform: "translateX(0%)" }))]),
      ],
      { optional: true }
    ),
  ]),
]);

export let sidenav = trigger("sidenav", [
  transition(":enter", [
    query(
      ":enter",
      [
        style({ transform: "translateX(-100%)" }),
        stagger(100, [animate("0.5s ease-out", style({ transform: "translateX(0%)" }))]),
      ],
      { optional: true }
    ),
  ]),

  transition(":leave", [
    query(":leave", [stagger(100, [animate("0.5s ease-in", style({ transform: "translateX(-100%)" }))])], { optional: true }),
  ]),
]);
