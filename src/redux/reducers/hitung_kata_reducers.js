const INITIAL_STATE = 0;

const hitungKata = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "countKata":
      return action.payload;

    default:
      return state;
  }
}

export default hitungKata;