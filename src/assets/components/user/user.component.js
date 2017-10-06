let text = {
    en: {
        titleSignIn: 'Sign in',
        titleSignOut: 'Sign out',
        currentlyDisabled: 'The sign in is currently disabled.',
        email: 'Email',
        password: 'Password',
        passwordConfirmation: 'Confirmation',
        handleRegistration: 'Create account',
        handleReset: 'Reset password',
        signIn: 'Sign in',
        signOut: 'Sign out',
        createAccount: 'Create new account',
        resetPassword: 'Reset your password',
        cancel: 'Back',
        emailSent: 'Email sent',
        checkYourInbox: 'Please check your inbox.',
        signOutDone: 'Sign out done',
        accountCreated: 'Account created',
        error: 'Error!!',
        errorOffline: 'This action is offline not possible.',
        errorNoEmail: 'Please enter your email address.',
        errorNoPassword: 'Please enter a password.',
        errorPasswordsDifferent: 'You entered two different passwords.',
        firebaseErrors: {
            'auth/email-already-in-use': 'The email address is already linked to another account.',
            'auth/invalid-email': 'The email address is invalid.',
            'auth/operation-not-allowed': 'Login is currently disabled.',
            'auth/weak-password': 'The password is not safe enough.',
            'auth/user-not-found': 'No account found for that email address.',
            'auth/user-disabled': 'Your account is deactivated.',
            'auth/wrong-password': 'The password is wrong.'
        }
    },
    de: {
        titleSignIn: 'Anmelden',
        titleSignOut: 'Abmelden',
        currentlyDisabled: 'Die Anmeldung ist zurzeit deaktiviert.',
        email: 'E-Mail',
        password: 'Passwort',
        passwordConfirmation: 'Bestätigung',
        handleRegistration: 'Konto erstellen',
        handleReset: 'Passwort zurücksetzen',
        signIn: 'Anmelden',
        signOut: 'Abmelden',
        createAccount: 'Neues Konto erstellen',
        resetPassword: 'Passwort zurücksetzen',
        cancel: 'Abbrechen',
        emailSent: 'E-Mail verschickt',
        checkYourInbox: 'Bitte schau in deinem Posteingang.',
        signOutDone: 'Abmeldung erfolgreich',
        accountCreated: 'Konto erstellt',
        error: 'Fehler',
        errorOffline: 'Diese Aktion ist offline nicht möglich.',
        errorNoEmail: 'Bitte gib Deine E-Mail-Adresse ein.',
        errorNoPassword: 'Bitte gib ein Passwort ein.',
        errorPasswordsDifferent: 'Du hast zwei unterschiedliche Passwörter eingegeben.',
        firebaseErrors: {
            'auth/email-already-in-use': 'Die E-Mail-Adresse wird bereits verwendet.',
            'auth/invalid-email': 'Die E-Mail-Adresse ist fehlerhaft.',
            'auth/operation-not-allowed': 'Anmelden ist zurzeit nicht möglich.',
            'auth/weak-password': 'Dein Passwort ist nicht sicher genug.',
            'auth/user-not-found': 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
            'auth/user-disabled': 'Dein Konto ist deaktiviert.',
            'auth/wrong-password': 'Das Passwort ist falsch.'
        }
    }
}

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
            mode: '',
            text: {},
            editProfileMode: false,
        }
    },
    created() {
        this.text = text['en'] || text['en']
        this.mode = this.$root.user ? 'signOut' : 'signIn';
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
        sign: function() {
            if (!this.isAuth) {
                authService.signIn(this.user)
                    .then((user) => {
                        alert(JSON.stringify(user));

                    })
                    .catch((err) => {
                        alert(err.code);
                        alert(err.message);
                        authService.createUser(this.user)
                            .then((user) => {
                                alert(JSON.stringify(user));

                            })
                            .catch((err) => {
                                alert(err.code);
                                alert(err.message);
                            });
                    });


            }

        },

    },
    computed: {
        //   mode() {
        //     return this.$root.user ? 'signOut' : 'signIn'
        // }

    }
}