<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Main Views -->
		<f7-views tabs toolbar-fixed :dynamic-navbar="true">
			<f7-view id="main" main active class="tab">
				<!-- Navbar -->
				<!-- <nav-bar></nav-bar> -->
				<!-- Pages -->
				<f7-pages>
					<f7-page>
						{{actionState}}
					</f7-page>

				</f7-pages>

			</f7-view>
			<f7-view id="albums" class="tab">
				<nav-bar v-bind:is-au="isAu" fixed></nav-bar>
				<f7-pages>
					<f7-page>
						{{actionState}}
						<!-- <f7-button big red @click="saveAlbum">save album</f7-button> -->
					</f7-page>
				</f7-pages>

			</f7-view>
			<f7-view id="gallery" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->

				<f7-pages>
					<f7-page v-if="isAu" class="album-container" hide-tabbar-on-scroll>
						{{actionState}}
						<!-- <album-form v-on:newalbum="newAlbum" :album="editalbum" :isNewAlbum="isNewAlbum"></album-form> -->
					</f7-page>
				</f7-pages>

			</f7-view>
			<f7-view id="user" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->
				<f7-pages>
					<f7-page v-if="isAu" class="album-container">
						{{actionState}}
						<!-- <slider :editalbum="editalbum"></slider> -->
						this is record view
					</f7-page>
				</f7-pages>
			</f7-view>
			<f7-view id="slide" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->
				<f7-pages>
					<f7-page>
						<eslide></eslide>
					</f7-page>
				</f7-pages>
			</f7-view>

			<botton-tabs></botton-tabs>

		</f7-views>
		<action-button></action-button>
		<!-- Popup -->
		<div class="popup popup-newslide">
			<!-- <div class="content-block"> -->
			<p-menu></p-menu>
			<!-- </div> -->
		</div>

		<!-- Login Screen -->
		<user-screen></user-screen>

	</div>
</template>

<script>

import UserScreen from "./assets/components/user";
import NavBar from "./assets/components/navbar";
import BottomNavBar from "./assets/components/bottomNavBar";
import ActionButton from "./assets/components/actionButton";

import Eslide from "./assets/components/eslide";
import PMenu from "./assets/components/pmenu";

export default {
	data() {
		return {
		}
	},
	created() {
		this.$store.commit("setActionState", "main");
	},
	components: {
		'user-screen': UserScreen,
		'nav-bar': NavBar,
		'botton-tabs': BottomNavBar,
		'action-button': ActionButton,
		'eslide': Eslide,
		'p-menu': PMenu,
	},
	methods: {
		// getCamera(s) {
		// 	alert("main vue: getCamera");
		// 	if (s.s === "camera") {
		// 		console.log(s);
		// 		this.prop = {
		// 			event: s.s,
		// 			fnCamera: true,
		// 		}
		// 		// this.getCamera();
		// 	}

		// 	// alert(JSON.stringify(s));
		// },
		// getCamera() {
        //     alert("eslide befor navigator getCamera");
        //     navigator.camera.getPicture(this.onSuccessImg, captureErrorImg, setOptions(Camera.PictureSourceType.Camera));
        // },
        // openFilePicker() {
        //     let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        //     navigator.camera.getPicture(this.onSuccessImg, captureErrorImg, setOptions(srcType));
        // },
        // onSuccessImg(imageUri) {
        //     alert("sdasdas");
        //     // let image = document.getElementById('myImage');
        //     // this.slide.img = this.filename;

        //     let src = "data:image/jpeg;base64," + imageUri;
        //     // image.src = src;
        //     this.slide.imgData = src;
        //     // image.style.display = "block";
        //     this.$store.commit("editSlide", this.slide);
        //     // this.saveImage(imageUri);
        // },
	},
	computed: {

		isAu() {
			return this.$store.state.userModule.isAuth;
		},
		currentUser() {
			return this.$store.state.userModule.user;
		},
		actionState() {
			return this.$store.state.actionModule.actionState;
		},
	}
}
</script>
