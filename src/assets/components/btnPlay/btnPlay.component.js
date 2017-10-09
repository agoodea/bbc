export default {
    name: 'btn-play',
    props: [],
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {
        playSlide() {
            let video = document.getElementById("videoSlide");

            video.play();
            let seconds = 5;
            let interval = setInterval(function() {
                seconds = (seconds - 0.1).toFixed(1);
                if (document.getElementById('playText')) {
                    document.getElementById('playText').innerHTML = seconds;
                }
            }, 100);
            setTimeout(function() {
                clearTimeout(interval);
                document.getElementById('playText').innerHTML = '5.0';
            }, seconds * 1000);
        }
    },
    computed: {

    }
}