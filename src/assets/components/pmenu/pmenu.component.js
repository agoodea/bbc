export default {
    name: 'pmenu',
    props: [],
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {
        getCamera() {
            // this.$emit('getCamera', { s: "camera" });
            this.$root.$emit('getCamera', { s: "camera" });
            this.$store.commit("setActionState", "slide_camera");
            this.$f7.showTab("#slide");
        },
        openFilePicker() {

            this.$root.$emit('openFilePicker', { s: "gallery" });
            this.$store.commit("setActionState", "slide_camera");
            this.$f7.showTab("#slide");
        }
    },
    computed: {
        actionState() {
            return this.$store.state.actionModule.actionState;
        },

    }
}