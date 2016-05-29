export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';
export const OPEN = 'OPEN';
export const CLOSED = 'CLOSED';


export function toggleDialog(gameType) {
  return {
    type: TOGGLE_DIALOG,
    game: gameType
  };
}