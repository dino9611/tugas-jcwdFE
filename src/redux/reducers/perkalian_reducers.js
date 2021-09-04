const INITIAL_STATE = 15;

const kaliBagi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "operasiKali":
      return state * action.henry;
      // Ini cara passing data dri child ke parent, liat Home.jsx

      case "operasiBagi":
        return state / 1;

    default:
      return state;
  }
}

export default kaliBagi;