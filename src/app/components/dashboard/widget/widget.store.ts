import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Widget } from '../../../models/widget.model';

type WidgetStore = {
  widgets: Widget[];
  isLoading: boolean;
};

const initialState: WidgetStore = {
  widgets: [],
  isLoading: false,
};

export const WidgetStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateWidgets(widget: Widget): void {
      patchState(store, (state) => ({ widgets: [...state.widgets, widget] }));
    },
    removeWidgets(): void {
      patchState(store, (state) => ({ widgets: [] }));
    },
  }))
);
