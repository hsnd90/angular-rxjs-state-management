import { BehaviorSubject, filter, Observable } from 'rxjs';
/**
 * @typeParam T - Store'da saklanacak verinin tipi veya modeli.
 * @typeParam U - Store tipi. ArrayStore veya ObjectStore olabilir.
 */
export class Store<T, U> {
  constructor(private initialValue: any) {
    this.initialValue.operation = 'initialized';
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
   * @param value - Asenkron işlemlerden gelen veriyi store'a yükler. Saklanan veri Array ise ArrayStore, Object ise ObjectStore tipinde olmalıdır.
   */
  load(value: U): void {
    if ((this.subject.value as any).hasOwnProperty('values')) {
      if ((this.subject.value as any).values.length > 0) {
        return;
      } else {
        this.subject.next(value);
      }
    } else {
      this.subject.next(value);
    }
  }

  /**
   * @description Store'daki veriyi döner.
   * @returns
   */
  get state(): StoreValueType<T, U> {
    if ((this.subject.value as any).hasOwnProperty('values')) {
      return structuredClone(
        (this.subject.getValue() as any).values
      ) as StoreValueType<T, U>;
    } else {
      return structuredClone(this.subject.getValue()) as StoreValueType<T, U>;
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
  get count(): U extends ArrayStore ? number : undefined {
    if ((this.subject.value as any).hasOwnProperty('values')) {
      return (this.subject.getValue() as any).values.length;
    } else {
      return undefined as U extends ArrayStore ? number : undefined;
    }
  }

  /**
   * @description Store'daki tüm veriyi temizler.
   */
  clearState(): void {
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
