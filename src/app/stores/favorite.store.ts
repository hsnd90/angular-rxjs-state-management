import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Favorite } from '../models/favorite';
import { inject } from '@angular/core';
import { OrderStore } from './order.store';

type FavoriteState = {
  favorites: Favorite[];
};

const initialState: FavoriteState = {
  favorites: [],
};

export const FavoriteStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);
