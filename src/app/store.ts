import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  share,
} from 'rxjs';
import { map as _map, mapValues, partialRight, pick, isEqual } from 'lodash';
/**
 * @typeParam T - Store'da saklanacak verinin tipi veya modeli.
 * @typeParam U - Store tipi. ArrayStore veya ObjectStore olabilir.
 */
export class Store<T, U> {
  private storeType = '';
  constructor(private initialValue: U) {
    (this.initialValue as any).operation = 'initialized';
    if ((this.subject.value as any).hasOwnProperty('values')) {
      this.storeType = StroreType.ArrayStore;
    } else {
      this.storeType = StroreType.ObjectStore;
    }
  }

  private readonly subject: BehaviorSubject<U> = new BehaviorSubject<U>(
    this.initialValue
  );

  /**
   * @description Store'daki veri değiştiğinde tetiklenir.
   * @returns ArrayStore veya ObjectStore tipinde veri döner.
   */
  readonly onChanged$ = (operations?: string | string[]) =>
    (this.subject.asObservable() as Observable<U>).pipe(
      filter((data: any) => {
        if (operations) {
          if (Array.isArray(operations)) {
            return operations.includes(data.operation);
          } else {
            return data.operation === operations;
          }
        }
        return data;
      })
    );

  /**
   * @description Store'a veri yükler. Store daha önce yüklenmişse çalışmaz.
   * @param value - Saklanan veri Array ise ArrayStore, Object ise ObjectStore tipinde olmalıdır.
   */
  protected load(value: U extends ArrayStore ? T[] : T): void {
    if (this.storeType === StroreType.ArrayStore) {
      if ((this.subject.value as any).values.length > 0) {
        return;
      } else {
        this.subject.next({
          operation: 'loaded',
          value: null,
          values: value,
        } as any);
      }
    } else if (this.storeType === StroreType.ObjectStore) {
      if (
        (this.subject.value as any).value &&
        Object.keys((this.subject.value as any).value)?.length > 0
      ) {
        return;
      } else {
        this.subject.next({ value, operation: 'loaded' } as any);
      }
    }
  }

  /**
   * @description Store'daki veriyi döner.
   * @returns
   */
  get state(): StoreValueType<T, U> {
    if (this.storeType === StroreType.ArrayStore) {
      return structuredClone(
        (this.subject.getValue() as any).values
      ) as StoreValueType<T, U>;
    } else {
      return structuredClone(
        (this.subject.getValue() as any).value
      ) as StoreValueType<T, U>;
    }
  }

  get state$(): Observable<StoreValueType<T, U>> {
    if (this.storeType === StroreType.ArrayStore) {
      return this.subject.pipe(map((x: any) => x.values)) as Observable<
        StoreValueType<T, U>
      >;
    } else {
      return this.subject.asObservable().pipe(
        map((x: any) => {
          return x.value;
        })
      ) as Observable<StoreValueType<T, U>>;
    }
  }

  watch<K extends keyof T>(key: K | K[]): Observable<T[K]> {
    if (this.storeType === StroreType.ArrayStore) {
      return this.state$.pipe(
        map((state: any) => {
          if (Array.isArray(key)) {
            return _map(state, partialRight(pick, key));
          } else {
            return _map(state, partialRight(pick, key)) as any;
          }
        }),
        distinctUntilChanged((a, b) => isEqual(a, b)),
        share()
      );
    } else {
      return this.state$.pipe(
        map((state: any) => {
          if (state) return (state as any)[key];
        }),
        distinctUntilChanged((a, b) => isEqual(a, b)),
        share()
      );
    }
  }

  /**
   * @description Store'daki veriyi günceller.
   * @param value - Saklanan veri Array ise ArrayStore, Object ise ObjectStore tipinde olmalıdır.
   */
  patchState(value: U): void {
    this.subject.next(value);
  }

  /**
   * @description Store'daki veri sayısını döner.
   */
  get count(): number {
    if (this.storeType === StroreType.ArrayStore) {
      return (this.subject.getValue() as any).values.length;
    } else {
      throw new Error('This store is ObjectStore, not an ArrayStore.');
    }
  }

  /**
   * @description Store'daki tüm veriyi temizler.
   */
  clearState(): void {
    if (this.storeType === StroreType.ArrayStore) {
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

enum StroreType {
  ObjectStore = 'ObjectStore',
  ArrayStore = 'ArrayStore',
}
