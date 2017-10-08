export default {
    name: 'bottom-nav-bar',
    props: [],
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {
        setStateAction(strState) {
            this.$store.commit("setActionState", strState);
        },
    },
    computed: {

    }
}