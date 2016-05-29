import {TOGGLE_DIALOG, OPEN, CLOSED} from './home.actions';

let initialState = {
  checkersDialog: {
    open: false
  },
  punsDialog: {
    open: false
  }
};
export function home(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return Object.assign({}, state, {
        [action.game]: {
          open: !state[action.game].open
        }
      });

    default:
      return state;
  }
}