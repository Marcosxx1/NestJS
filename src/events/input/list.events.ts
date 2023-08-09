export class ListEvents {
  when?: WhenEventFilter = WhenEventFilter.All;
}

export enum WhenEventFilter {
  All = 1,
  Today,
  Tomorow,
  ThisWeek,
  NextWeek,
}
