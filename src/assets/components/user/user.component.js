import text from "../../js/localization";

export default {
    components: {
        // 'settings': Settings,
    },
    name: 'user',
    props: [],
    mounted() {

    },
    data: function() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            text: {},
            editProfileMode: false,
        }
    },
    created() {
        this.text = text['en'] || text['en']
    },
    methods: {
        cancel: function() {
            // Reset form
            this.email = ''
            this.password = ''
            this.passwordConfirmation = ''
            this.mode = this.$root.user ? 'signOut' : 'signIn'
                // Navigate back
            let viewId = null
            window.f7.views.map((view, id) => {
                if (view.selector === window.localStorage.requestedView) viewId = id
            })
            window.localStorage.removeItem('requestedView')
            window.localStorage.removeItem('requestedUrl')
        },
        handleSignIn: function() {
            if (navigator.onLine === false) {
                window.f7.alert(this.text.errorOffline, this.text.error)
            } else if (this.email === '') {
                window.f7.alert(this.text.errorNoEmail, this.text.error)
            } else if (this.password === '') {
                window.f7.alert(this.text.errorNoPassword, this.text.error)
            } else {
                // Show loading indicator
                window.f7.showIndicator()
                    // Sign in user
                window.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    // On success
                    .then(user => {
                        this.handleSignInDone()
                    })
                    // On error, show alert
                    .catch(err => {
                        debugger
                        // Hide loading indicator
                        window.f7.hideIndicator()
                            // Shoe error alert
                        window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
                        window.f7.alert('#1')
                    })
            }
        },
        handleSignInDone: function() {
            // Hide loading indicator
            window.f7.hideIndicator()
                // Reset form
            this.email = ''
            this.password = ''
            this.passwordConfirmation = ''
            this.mode = 'signOut'
                // Show requested URL or navigate back
            let viewId = null
            window.f7.views.map((view, id) => {
                if (view.selector === window.localStorage.requestedView) viewId = id
            })
            if (window.localStorage.requestedUrl) {
                let url = window.localStorage.requestedUrl
                setTimeout(() => {
                    window.f7.views.main.router.back({ animatePages: false })
                    setTimeout(() => {
                        window.f7.views.main.router.load({ url: url })
                    })
                })
            }
            // Reset local storage
            window.localStorage.removeItem('requestedView')
            window.localStorage.removeItem('requestedUrl')
        },
        handleSignOut: function() {
            window.firebase.auth().signOut()
                .then(() => {
                    // Reset form
                    this.mode = 'signIn'
                        // Navigate back
                    let viewId = null
                    window.f7.views.map((view, id) => {
                            if (view.selector === window.localStorage.requestedView) viewId = id
                        })
                        // window.f7.views[viewId || 'main'].router.back()
                        // Show notification
                    window.f7.addNotification({
                        title: this.text.signOut,
                        message: this.text.signOutDone,
                        hold: 3000,
                        closeIcon: false
                    });
                    debugger
                    myApp.loginScreen();

                })
        },
        handleRegistration: function() {
            if (navigator.onLine === false) {
                window.f7.alert(this.text.errorOffline, this.text.error)
            } else if (this.email === '') {
                window.f7.alert(this.text.errorNoEmail, this.text.error)
            } else if (this.password === '') {
                window.f7.alert(this.text.errorNoPassword, this.text.error)
            } else if (this.passwordConfirmation !== this.password) {
                window.f7.alert(this.text.errorPasswordsDifferent, this.text.error)
            } else {
                // Show loading indicator
                window.f7.showIndicator()
                    // Create new user
                window.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    // On success, sign in user
                    .then(user => {
                        // Hide loading indicator
                        window.f7.hideIndicator()
                            // Show notification
                        window.f7.addNotification({
                                title: this.text.accountCreated,
                                message: this.text.checkYourInbox,
                                hold: 3000,
                                closeIcon: false
                            })
                            // Handle sign in
                        this.handleSignInDone()
                    })
                    // On error, show alert
                    .catch(err => {
                        // Hide loading indicator
                        window.f7.hideIndicator()
                            // Show error alert
                        window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
                    })
            }
        },
        handleReset: function() {
            if (navigator.onLine === false) {
                window.f7.alert(this.text.errorOffline, this.text.error)
            } else if (this.email === '') {
                window.f7.alert(this.text.errorNoEmail, this.text.error)
            } else {
                // Show loading indicator
                window.f7.showIndicator()
                    // Send reset link
                window.firebase.auth().sendPasswordResetEmail(this.email)
                    .then(user => {
                        // Hide loading indicator
                        window.f7.hideIndicator()
                            // Update mode
                        this.mode = 'signIn'
                            // On success, show notfication and login screen again
                        window.f7.addNotification({
                            title: this.text.emailSent,
                            message: this.text.checkYourInbox,
                            hold: 3000,
                            closeIcon: false
                        })
                        this.mode = 'signIn'
                    })
                    .catch(err => {
                        // Hide loading indicator
                        window.f7.hideIndicator()
                            // Show error alert
                        window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
                    })
            }
        },

    },
    computed: {
        mode() {
            return this.$store.state.userModule.isAuth ? 'signOut' : 'signIn'
        }

    }
}