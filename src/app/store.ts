import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  share,
} from 'rxjs';
import { map as _map, isEqual } from 'lodash';
/**
 * @typeParam T - Store'da saklanacak verinin tipi veya modeli.
 */
export class Store<T> {
  constructor(private initialValue: StoreParameter<T>) {
    (this.initialValue as any).operation = 'initialized';
  }

  private readonly subject: BehaviorSubject<StoreParameter<T>> =
    new BehaviorSubject<StoreParameter<T>>(this.initialValue);

  /**
   * @description Store'daki veri değiştiğinde tetiklenir.
   * @returns ArrayStore veya ObjectStore tipinde veri döner.
   */
  readonly onChanged$ = (operations?: string | string[]) =>
    (this.subject.asObservable() as Observable<StoreParameter<T>>).pipe(
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
  protected load(value: T): void {
    this.subject.next({ value, operation: 'loaded' } as any);
  }

  /**
   * @description Store'daki veriyi döner.
   * @returns
   */
  get state(): T {
    return structuredClone(this.subject.getValue().value);
  }

  get state$(): Observable<T> {
    return this.subject.asObservable().pipe(
      map((x: any) => {
        return x.value;
      })
    );
  }

  watch<K extends keyof T>(key?: K | K[]): Observable<T[K]> {
    return this.state$.pipe(
      map((state: any) => {
        if (state) {
          if (key) return state[key];
          else return state;
        }
      }),
      distinctUntilChanged((a, b) => isEqual(a, b)),
      share()
    );
  }

  /**
   * @description Store'daki veriyi günceller.
   * @param value - Saklanan veri Array ise ArrayStore, Object ise ObjectStore tipinde olmalıdır.
   */
  updateState(value: StoreParameter<T>): void {
    this.subject.next(value);
  }

  /**
   * @description Store'daki tüm veriyi temizler.
   */
  clearState(val?: undefined | T): void {
    this.subject.next({
      operation: 'cleared',
      value: (val as any) ?? undefined,
    });
  }
}

interface StoreParameter<T> {
  operation: any;
  obj?: any;
  value: T;
}
