// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

const $$ = Dom7;

// import firebase from 'firebase';
// import * as firebase from "firebase";

// Import F7 iOS Theme Styles
/* import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'*/
/* OR for Material Theme:*/
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'


// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import AppStyles from './assets/css/framework7-icons.css'
import AppStyles from './assets/css/some.css'
// Import Routes
import Routes from './routes.js'

// // Import App Component
import App from './main.vue'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

import Vuex from 'vuex'

Vue.use(Vuex)


import userModule from "./assets/services/store/user.module"
import tempModule from "./assets/services/store/temp.module"

const store = new Vuex.Store({
    modules: {
        userModule,
        tempModule,
    }
})

// import VueProgressBar from 'vue-progressbar';

import moment from 'moment'

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(value).format('DD/MM/YYYY')
    }
});

// Vue.use(VueProgressBar, {
//     color: 'rgb(143, 255, 199)',
//     failedColor: 'red',
//     height: '2px'
// })

var config = {
    apiKey: "AIzaSyCbKzLmzVh-HRZuItsYYBHyMWvIOna_Dn0",
    authDomain: "who-is-who-80223.firebaseapp.com",
    databaseURL: "https://who-is-who-80223.firebaseio.com",
    projectId: "who-is-who-80223",
    storageBucket: "who-is-who-80223.appspot.com",
    messagingSenderId: "443249798545"
};

let mixins = {}


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
        require('firebase/auth')
        require('firebase/database')
        require('firebase/storage')
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

// var bus = new Vue();


import VueLogger from 'vuejs-logger'

const options = {
    logLevel: 'debug',
    // optional : defaults to false if not specified 
    stringifyArguments: false,
    // optional : defaults to false if not specified 
    showLogLevel: false
}

Vue.use(VueLogger, options);
// Vue.use(firebase);

// import authService from './services/auth.service.js'
// Init App
let vm = new Vue({
    el: '#app',
    template: '<app/>',
    created() {
        this.$log.info('test');
    },
    // data: data,
    mixins: useMixins,
    store,
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        // material: true,
        routes: Routes
    },
    // Register App Component
    components: {
        app: App
    }
})