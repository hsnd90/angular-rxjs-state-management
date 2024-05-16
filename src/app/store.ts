import { BehaviorSubject } from 'rxjs';

export class Store<T, U> {
  constructor(private initialValue: any) {
    console.log('Store created');
  }

  private subject = new BehaviorSubject<U>(this.initialValue);

  onChanged$ = this.subject.asObservable();

  getState(): StoreValueType<T, U> {
    if ((this.subject.value as any).hasOwnProperty('values')) {
      return [...(this.subject.value as any).values] as StoreValueType<T, U>;
    } else {
      return {...this.subject.value} as StoreValueType<T, U>;
    }
  }

  setState(value: U) {
    this.subject.next(value);
  }

  clearState() {
    if ((this.subject.value as any).hasOwnProperty('values')) {
      this.subject.next({
        operation: 'cleared',
        value: null,
        values: [],
      } as any);
    } else {
      this.subject.next({
        operation: 'cleared',
        value: {},
      } as any);
    }
  }
}

interface BaseStore {
  operation: any;
}

type StoreValueType<T, U> = U extends ArrayStore ? T[] : T;

export type ObjectStore = {
  value: any;
} & BaseStore;

export type ArrayStore = {
  value: any;
  values: any[];
} & BaseStore;
