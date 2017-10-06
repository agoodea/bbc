<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Main Views -->
		<f7-views tabs toolbar-fixed :dynamic-navbar="true">
			<f7-view id="main-view" main active class="tab">
				<!-- Navbar -->
				<!-- <nav-bar></nav-bar> -->
				<!-- Pages -->
				<f7-pages>
					<f7-page></f7-page>
						<!-- <f7-list>
									<f7-list-item link="/about/" title="About"></f7-list-item>
									<f7-list-item link="/form/" title="Form"></f7-list-item>
									<f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>
								</f7-list> -->
						<!-- <f7-block-title>Side Panels</f7-block-title>
								<f7-block>
									<f7-grid>
										<f7-col width="50">
											<f7-button open-panel="left">Left Panel</f7-button>
										</f7-col>
										<f7-col width="50">
											<f7-button open-panel="right">Right Panel</f7-button>
										</f7-col>
									</f7-grid>
								</f7-block> -->
						<!-- <f7-block-title>Modals</f7-block-title>
						<f7-block>
							<f7-grid>
								<f7-col width="50">
									<f7-button open-popup="#popup">Popup</f7-button>
								</f7-col>
								<f7-col width="50">
									<f7-button open-login-screen="#login-screen">Login Screen</f7-button>
								</f7-col>
								<f7-col width="50">
									<f7-button> {{isAu}} {{currentUser}}</f7-button>
								</f7-col>
							</f7-grid>
						</f7-block> -->
					</f7-page>
				</f7-pages>

			</f7-view>
			<f7-view id="tab2" class="tab">
				<nav-bar v-bind:is-au="isAu" fixed></nav-bar>
				<f7-pages>
					<f7-page v-if="isAu">
						<!-- <f7-button big red @click="saveAlbum">save album</f7-button> -->
					</f7-page>
				</f7-pages>

			</f7-view>
			<f7-view id="tab3" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->

				<f7-pages>
					<f7-page v-if="isAu" class="album-container" hide-tabbar-on-scroll>
						<!-- <album-form v-on:newalbum="newAlbum" :album="editalbum" :isNewAlbum="isNewAlbum"></album-form> -->
					</f7-page>
				</f7-pages>

			</f7-view>
			<f7-view id="tab4" class="tab">
				<!-- <nav-bar v-bind:is-au="isAu" fixed></nav-bar> -->
				<f7-pages>
					<f7-page v-if="isAu" class="album-container">
						<!-- <slider :editalbum="editalbum"></slider> -->
						this is record view
					</f7-page>
				</f7-pages>
			</f7-view>
			<action-button></action-button>
			<botton-tabs></botton-tabs>

		</f7-views>

		<!-- Popup -->
		<div class="popup popup-newslide">
			<!-- <div class="content-block"> -->
				<eslide></eslide>
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

export default {
	components: {
		'user-screen': UserScreen,
		'nav-bar': NavBar,
		'botton-tabs': BottomNavBar,
		'action-button': ActionButton,
		'eslide': Eslide,
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
</script>
