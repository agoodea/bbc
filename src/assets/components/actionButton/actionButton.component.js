export default {
    name: 'action-button',
    props: [],
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {
        toEditSlide() {

            this.$f7.showTab("#slide");
            if (this.slide.blob !== "") {
                this.$store.commit("setActionState", "slide_check");
            } else {
                this.$store.commit("setActionState", "slide_camera");
            }

        },
        toRecord() {
            this.$store.commit("setActionState", "slide_record");
            this.$root.$emit('getRecord', { s: "audio" });
        },
    },
    computed: {
        actionState() {
            return this.$store.state.actionModule.actionState;
        },
        isEdit() {
            return this.$store.state.dataModule.isEdit;
        },
        slide() {
            return this.$store.state.dataModule.slide;
        }
    }
}