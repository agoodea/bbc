export default {
    name: 'eslide',
    props: [],
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        isAu() {
            return this.$store.state.userModule.isAuth;
        },
    }
}