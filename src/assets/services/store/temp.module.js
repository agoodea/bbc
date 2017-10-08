export default {
    state: {
        paths: {
            imgPath: "",
            recordPath: "",
            slidePath: "",
            albumsPath: "",
        },
    },
    mutations: {
        setPath(state, path_) {
            state.path = path_;
        }
    }
}