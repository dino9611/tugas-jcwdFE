const INITIAL_STATE = 0

const HitungKata = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "HITUNGKATA":
            return action.payload
        default:
            return state;
    }
}

export default HitungKata;