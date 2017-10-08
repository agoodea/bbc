export default {

    state: {
        clSlide: {
            ame: "",
            imgData: "",
            blob: "",
            fileName: "",
        },
        slide: {
            name: "",
            imgData: "",
            blob: "",
            fileName: "",
        },
        isEdit: false,
    },
    mutations: {
        editSlide(state, slide_) {
            if (slide_) {
                state.isEdit = true;
                state.slide = slide_;
            }
        },
        clearSlide(state) {
            state.isEdit = false;
            state.slide = state.clSlide;
        }
    }
}