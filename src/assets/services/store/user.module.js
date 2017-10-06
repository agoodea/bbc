export default {
    state: {
        user: {},
        isAuth: false,
    },
    mutations: {
        inAuth(state, user_) {
            if (user_) {
                state.isAuth = true;
                state.user = user_;
            } else {
                state.isAuth = false;
                state.user = undefined;
            }
        }
    }
}