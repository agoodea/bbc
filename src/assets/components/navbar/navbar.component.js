export default {
    name: 'navbar',
    props: [],
    mounted() {

    },
    data() {
        return {
            ddd: "sdfsdf",
        }
    },
    methods: {

    },
    computed: {
        isAu() {
            return this.$store.state.userModule.isAuth;
        },
        currentUser() {
            return this.$store.state.userModule.user;
        },
    }
}