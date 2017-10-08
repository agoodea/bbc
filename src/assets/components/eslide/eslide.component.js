function setOptions(srcType) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        // PictureSourceType: 0,
        //  targetWidth: 300,
        //  targetHeight: 400,

    }
    return options;
}

function captureErrorImg(e) {
    console.log('captureError', e);
    console.log(e);
};

export default {
    name: 'eslide',
    props: ['fnCamera'],
    created() {

    },
    mounted() {
        let that = this;
        this.$root.$on('getCamera', function(s) {
            console.log(s);
            that.getCamera();
        });
        this.$root.$on('openFilePicker', function(s) {
            console.log(s);
            that.openFilePicker();
        });

    },
    data() {
        return {
            isMenu: true,
            isNewSlide: true,
        }
    },
    methods: {
        back() {
            this.$store.commit("clearSlide");
            this.$store.commit("setActionState", "main");
            this.$f7.showTab("#main");
            console.log('object');
        },
        getCamera() {
            navigator.camera.getPicture(this.onSuccessImg, captureErrorImg, setOptions(Camera.PictureSourceType.Camera));
        },
        openFilePicker() {
            let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            navigator.camera.getPicture(this.onSuccessImg, captureErrorImg, setOptions(srcType));
        },
        onSuccessImg(imageUri) {
            // let image = document.getElementById('myImage');
            // this.slide.img = this.filename;

            let src = "data:image/jpeg;base64," + imageUri;
            // image.src = src;
            this.slide.imgData = src;
            // image.style.display = "block";
            this.$store.commit("editSlide", this.slide);
            // this.saveImage(imageUri);
        },
    },
    computed: {
        isAu() {
            return this.$store.state.userModule.isAuth;
        },
        path() {
            return this.$store.state.tempModule.path;
        },
        slide() {
            return this.$store.state.dataModule.slide;
        }
    }
}