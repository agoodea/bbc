import vue from "vue";

export default {

    getCurrentUser() {
        var user = firebase.auth().currentUser;

        if (user) {
            return user;
        } else {
            return {}
        }
    },


}