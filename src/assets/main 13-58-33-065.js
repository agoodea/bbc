// Import Vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
 
 */
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import AppStyles from './assets/css/framework7-icons.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'

import userModule from "./assets/services/store/user.module"
import tempModule from "./assets/services/store/temp.module"

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

const store = new Vuex.Store({
    modules: {
        userModule,
        tempModule,
    }
})

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(value).format('DD/MM/YYYY')
    }
});

var config = {
    apiKey: "AIzaSyCbKzLmzVh-HRZuItsYYBHyMWvIOna_Dn0",
    authDomain: "who-is-who-80223.firebaseapp.com",
    databaseURL: "https://who-is-who-80223.firebaseio.com",
    projectId: "who-is-who-80223",
    storageBucket: "who-is-who-80223.appspot.com",
    messagingSenderId: "443249798545"
};

let mixins = {};

mixins.manageGlobalDataObject = {
        // Set initial data
        data: {
            data: {},
            settings: {
                sync: false,
            }
        },
        // Methods to add or remove data
        methods: {
            saveData: function(path, value) {
                // Clone current data
                let data = JSON.parse(JSON.stringify(this.data))
                    // Add value to path
                data = set(data, path, value)
                    // Update root data object
                this.$set(this, 'data', data)
                    // Update local storage
                window.localStorage.data = JSON.stringify(this.data)
            },
            removeData: function(path) {
                // Clone current data
                let data = JSON.parse(JSON.stringify(this.data))
                    // Remove path
                unset(data, path)
                    // Update root data object
                this.$set(this, 'data', data)
                    // Update local storage
                window.localStorage.data = JSON.stringify(this.data)
            }
        },
        // Restore local storage
        created: function() {
            this.data = window.localStorage.data !== undefined ? JSON.parse(window.localStorage.data) : {}
        }
    },
    mixins.manageFirebase = {
        // Set initial values
        data: {
            user: null,
            db: null,
            store: null,
            timestamp: null
        },
        // Init Firebase
        created: function() {
            // Use Firebase

            // Include scripts
            let firebase = require('firebase/app')
                // require('firebase/auth')
                // require('firebase/database')
                // require('firebase/storage')
                // Initialize Firebase
            window.firebase = firebase.initializeApp(config);
            // Use auth service

            // Get initial user data from local storage
            this.user = window.localStorage.user ? JSON.parse(window.localStorage.user) : null
                // Clean local storage if user is not logged in initially
            if (!window.localStorage.user) this.cleanLocalStorageAfterLogut()
                // Monitor user changes
            firebase.auth().onAuthStateChanged(user => {
                debugger
                this.user = user ? {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL
                } : null
            })

            // Use database service
            this.db = function(path) {
                    return firebase.database().ref(path)
                }
                // this.timestamp = firebase.database.ServerValue.TIMESTAMP

            // Use storage service
            this.store = function(path) {
                return firebase.storage().ref(path)
            }


        },
        // Watch for changes
        watch: {
            user: function(newUser) {
                // Update local storage
                if (newUser === null) {
                    window.localStorage.removeItem('user')
                    this.cleanLocalStorageAfterLogut()
                } else {
                    window.localStorage.user = JSON.stringify(newUser)
                }
                // Update window object
                window.user = newUser
            },
            db: function(newDB) {
                // Update window object
                window.db = newDB
            },
            store: function(newStore) {
                // Update window object
                window.store = newStore
            },
            timestamp: function(newTimestamp) {
                // Update window object
                window.timestamp = newTimestamp
            }
        },
        methods: {
            cleanLocalStorageAfterLogut: function() {
                for (let item in window.localStorage) {
                    // History
                    if (/^urls\|([0-9a-zA-Z._-]+)$/.test(item)) {
                        let urls = JSON.parse(window.localStorage[item])
                        let newUrls = []
                        let loginRequired = false
                        urls.map((url) => {
                            if (this.urlRequiresLogin(url)) {
                                loginRequired = true
                            } else if (!loginRequired) {
                                newUrls.push(url)
                            }
                        })
                        window.localStorage[item] = JSON.stringify(newUrls)
                            // Component data and scroll positions
                    } else if (/(scroll|data)\|[0-9a-zA-Z._-]+\|(.+)$/.test(item)) {
                        let url = item.match(/(scroll|data)\|[0-9a-zA-Z._-]+\|(.+)$/)[2]
                        if (this.urlRequiresLogin(url)) {
                            window.localStorage.removeItem(item)
                        }
                    }
                }
            }
        }
    }

let useMixins = Object.keys(mixins).map(mixin => mixins[mixin])


// Init App
new Vue({
    el: '#app',
    template: '<app/>',
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        material: true,
        routes: Routes
    },
    store,
    // Register App Component
    components: {
        app: App
    }
})