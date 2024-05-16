import { BehaviorSubject } from 'rxjs';
/**
 * @typeParam T - Store'da saklanacak verinin tipi veya modeli.
 * @typeParam U - Store tipi. ArrayStore veya ObjectStore olabilir.
 */
export class Store<T, U> {
  constructor(private initialValue: any) {}

  private subject = new BehaviorSubject<U>(this.initialValue);

  /**
   * @description Store'daki veri değiştiğinde tetiklenir.
   * @returns ArrayStore veya ObjectStore tipinde veri döner.
   */
  onChanged$ = this.subject.asObservable();

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
  getState(): StoreValueType<T, U> {
    if ((this.subject.value as any).hasOwnProperty('values')) {
      return [...(this.subject.value as any).values] as StoreValueType<T, U>;
    } else {
      return { ...this.subject.value } as StoreValueType<T, U>;
    }
  }

  /**
   * @description Store'daki veriyi günceller.
   * @param value - Saklanan veri Array ise ArrayStore, Object ise ObjectStore tipinde olmalıdır.
   */
  setState(value: U) {
    this.subject.next(value);
  }

  /**
   * Store'daki tüm veriyi temizler.
   */
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
