const INITIAL_STATE = 15
const perkalian = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "KALI":
            return state * action.haha
        case "BAGI":
            return state / 1
        default:
            return state;
    }
}

export default perkalian;