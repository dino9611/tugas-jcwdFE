// Set initial state dlu
// Apapun data nya (boolean, string, array, etc.), di redux perlu initial state
// Biasanya redux dibikin folder sendiri namanya redux, biar lebih rapih, skrg belajar blm dipisah2in
const INITIAL_STATE = 20;

// Bikin function, si state defaultnya initial state
const tambahKurang = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Klo action ga ada, default nya balik ke state

    case "operasiTambah":
      return state + 1;
      // Usahakan return tipe data sama, misal number ya return number

      case "operasiKurang":
        return state - 1;

    default:
      return state;
  }
}

export default tambahKurang;