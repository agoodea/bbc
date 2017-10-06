export default {
    state: {
        uid: "",
        displayName: "",
        photoURL: "",
        date: "",
        regDate: "",
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
}