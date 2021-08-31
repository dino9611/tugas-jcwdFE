const INITIAL_STATE = 57
const tambahan = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TAMBAH":
            return state + 1
        case "KURANG":
            return state - 1
        default:
            return state
    }
}

export default tambahan;