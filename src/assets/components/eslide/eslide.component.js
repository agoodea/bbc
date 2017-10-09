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

import BtnPlay from "../btnPlay";

export default {
    name: 'eslide',
    props: [],
    components: {
        'btn-play': BtnPlay,
    },
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
        this.$root.$on('getRecord', function(s) {
            console.log(s);
            that.getRecord.call(that);
        });

    },
    data() {
        return {
            isMenu: true,
            isNewSlide: true,
            intervalCanvas: {},
        }
    },
    methods: {
        tempFn() {
            alert("sdfsdf");
        },
        back() {
            this.$store.commit("clearSlide");
            this.clearCanvas();
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
            // let image1 = document.getElementById('myImage');
            // this.slide.img = this.filename;

            let src = "data:image/jpeg;base64," + imageUri;
            // image.src = src;
            // image1.src = src;
            this.slide.imgData = src;

            let canvas = document.getElementById("slideimg");
            alert("canvas");
            alert(canvas);
            try {
                let canvasStream = canvas.captureStream();
                alert(canvasStream)
            } catch (error) {
                alert(error);
            }
            let context = canvas.getContext("2d");
            let img = new Image();

            // Привязываем функцию к событию onload
            // Это указывает браузеру, что делать, когда изображение загружено
            img.onload = function() {

                let height_ = img.naturalHeight;
                let width_ = img.naturalWidth;
                canvas.width = width_;
                canvas.height = height_;
                context.drawImage(img, 0, 0);
                try {
                    let canvasStream1 = canvas.captureStream();
                    alert(canvasStream1)
                } catch (error) {
                    alert(error);
                }
                this.intervalCanvas = setInterval(function() { context.drawImage(img, 0, 0); }, 1000);

            };
            img.src = src;
            // image.style.display = "block";
            this.$store.commit("editSlide", this.slide);
            // this.saveImage(imageUri);
        },
        onSuccessRecord(audioStream) {

            let canvas = document.getElementById('slideimg');
            let context = canvas.getContext("2d");
            // canvas.capturestream.enabled = true;
            let canvasStream = canvas.captureStream();
            let finalStream = new MediaStream();
            alert("888888");
            audioStream.getAudioTracks().forEach(function(track) {
                finalStream.addTrack(track);
            });
            alert("99999");
            canvasStream.getVideoTracks().forEach(function(track) {
                finalStream.addTrack(track);
            });
            let recorder = RecordRTC(finalStream, {
                type: 'video',
                mimeType: 'video/mp4',
            });
            alert("666666");
            recorder.startRecording();
            let stop = false;
            let that = this;
            alert("7777777");
            (function looper() {
                if (stop) {
                    alert("1111");
                    recorder.stopRecording(function(singleWebM) {
                        alert("2222");
                        let blob = recorder.getBlob();
                        let video = document.createElement("video");
                        let btnPlay = document.getElementById("btnPlay");
                        video.src = singleWebM;
                        video.id = "videoSlide";
                        canvas.style.display = "none";
                        video.autoplay = true;
                        video.style.borderRadius = "6px";
                        // video.loop = true;
                        // video.controls = true;
                        alert("33333");
                        let content = document.getElementById("content");
                        content.insertBefore(video, btnPlay);

                        // document.body.innerHTML = '<video controls src="' + singleWebM + '" autoplay loop></video>';
                        // document.body.innerHTML = '<video controls src="' + URL.createObjectURL(blob) + '" autoplay loop></video>';
                        audioStream.stop();
                        canvasStream.stop();
                        that.slide.blob = blob;
                        that.$store.commit("editSlide", that.slide);
                        that.$store.commit("setActionState", "slide_check");
                        btnPlay.style.display = "block";
                        document.getElementById("playText").style.display = "block";
                    });
                    return;
                }
                setTimeout(looper, 100);
            })();
            let seconds = 5;
            let interval = setInterval(function() {
                seconds--;
                alert("44444");
                if (document.getElementById('micText')) {
                    document.getElementById('micText').innerHTML = seconds;
                }
            }, 1000);
            setTimeout(function() {
                alert("55555");
                clearTimeout(interval);
                clearTimeout(this.intervalCanvas);
                stop = true;
            }, seconds * 1000);

        },
        getRecord() {
            alert("getRecord");
            try {
                let that = this;
                var promisifiedOldGUM = function(constraints) {

                    var getUserMedia = (
                        navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia
                    );

                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }

                    return new Promise(function(resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });

                }

                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {};
                }

                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
                }

                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(this.onSuccessRecord).catch((err) => { alert(err) });
            } catch (error) {
                alert("TRYCATCH");
                alert(error);
            }


        },
        clearCanvas() {
            let canvas = document.getElementById("slideimg");
            let context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        },
        saveSlide() {
            alert(JSON.stringify(this.slide));
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