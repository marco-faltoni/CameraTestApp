
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    
    console.log('Ready - Running cordova-' + cordova.platformId + '@' + cordova.version);

    document.getElementById('deviceready').classList.add('ready');
    let body = document.querySelector('.body');
    

    // transition page
    barba.init({
        views: [
            {
                namespace: 'splash',
                beforeEnter() {
                    // console.log('enter');
                    const revealText = document.querySelector('.maintext');
                    const link = document.getElementById('link');
                    
                    const slideTl = gsap.timeline({
                        defaults: {duration:1.5, ease: 'power2.inOut'}
                    });
                    slideTl.fromTo(revealText, {y: '-300%'}, {y: '0'}, '0');
                    slideTl.fromTo(link, {x: '-200%'}, {x: '0'}, '-=1');
                },
                beforeLeave(){
                    let background = document.getElementById("particles-js");
                    // console.log('leave');
                    background.classList.add('none');
                    body.classList.add('black');
                }
            },
            {
                namespace: 'camera',
                beforeEnter() {
                    const iconTiny = document.querySelector('.icon-mini');
                    const icons = document.querySelector('.icons');
                    const tit = document.getElementById('title');

                    const slideTl = gsap.timeline({
                        defaults: {duration:1.5, ease: 'power2.inOut'}
                    });
                    slideTl.fromTo(tit, {y: '-300%'}, {y: '0'}, '0');
                    slideTl.fromTo(iconTiny, {x: '-300%'}, {x: '0'}, '0');
                    slideTl.fromTo(icons, {y: '200%'}, {y: '0'}, '-=0.5');

                    // faccio partire la camera quando entro nella pagina
                    CameraPreview.startCamera({
                        x: 0, 
                        y: 80, 
                        width: window.screen.width, 
                        height: window.screen.height - 210, 
                        camera: "back", 
                        tapPhoto: false, 
                        previewDrag: false, 
                        toBack: false,
                        tapFocus: true,
                        storeToFile: false,
                    });


                },
                afterEnter(){
                    // console.log(location.pathname);
                    // CameraPreview.show();
                    // console.log('enter-camera');
                    // catturo gli elementi che mi servono
                    let btncamera = document.querySelector(".takephoto");
                    let btnswitch = document.querySelector(".switch");
                    let photoTaked = document.querySelector(".taked");
                    let icons = document.querySelector(".icons");
                    let menu = document.querySelector(".menu");
                    let iconMini = document.querySelector(".icon-mini");
                    let iconsNext = document.querySelector(".icons-next");
                    let iconBack = document.querySelector(".icon-back");
                    let iconDown = document.querySelector(".icon-down");
                    let iconSend = document.querySelector(".icon-send");
                    let iconFlash = document.querySelector(".flash");
                    let iconLoad = document.querySelector(".loader");
                    let imgContainer = document.querySelector(".capture");
                    let container = document.getElementById("deviceready-two");
                    console.log(iconFlash.dataset.flash);
                    

                    // CameraPreview.setFlashMode('on');
                    // CameraPreview.setFlashMode('AUTO');

                    // rimango in ascolto del click sul bottone camera
                    btncamera.addEventListener("click", takePicture);
                    // setto il flash della camera
                    iconFlash.addEventListener("click", changeValue);
                    // torno indietro
                    iconBack.addEventListener("click", goingBack);
                    // invio immagine
                    iconSend.addEventListener("click", sendImage);
                    // scelgo se utilizzare la camera principale o frontale
                    btnswitch.addEventListener("click", function(){
                        CameraPreview.switchCamera();
                    });


                    function takePicture(){
                        photoTaked.src = '';

                        icons.classList.add('none');
                        iconMini.classList.add('none');

                        CameraPreview.getFlashMode(function(currentFlashMode){
                            console.log(currentFlashMode);
                        });
                        CameraPreview.takePicture(function(imgData){
                            
                            photoTaked.src = 'data:image/jpeg;base64,' + imgData;
                            // console.log(data);
                            // console.log(window.location);
                        });
                        CameraPreview.hide();
                        iconsNext.classList.remove('none');
                    }

                    function changeValue(e){
                        // console.log(iconFlash.value);
                        
                        if (iconFlash.dataset.flash === 'auto') {
                            iconFlash.dataset.flash = 'on';
                            this.src = '../assets/flashOn.svg';
                            CameraPreview.setFlashMode('on');

                        } else if (iconFlash.dataset.flash === 'on') {
                            iconFlash.dataset.flash = 'off';
                            this.src = '../assets/flashOff.svg';
                            CameraPreview.setFlashMode('off');

                        } else if (iconFlash.dataset.flash === 'off'){
                            iconFlash.dataset.flash = 'auto';
                            this.src = '../assets/flashAuto.svg';
                            CameraPreview.setFlashMode('auto');
                        }
                    }

                    function goingBack(){
                        CameraPreview.show();
                        icons.classList.remove('none');
                        iconMini.classList.remove('none');
                        iconsNext.classList.add('none');
                    }

                    function sendImage(){
                        event.preventDefault();
                        iconSend.classList.add('none');
                        iconLoad.classList.remove('none');
                        container.classList.add('no-touch');
                        iconBack.classList.add('loading');
                        iconDown.classList.add('loading');
                        imgContainer.classList.add('loading');
                        menu.classList.add('loading');


                        setTimeout(() => {
                            iconLoad.classList.add('none');
                            iconSend.classList.remove('none');
                        }, 3000);
                        setTimeout(() => {
                            alert ('Image Sent!');
                            container.classList.remove('no-touch');
                            iconBack.classList.remove('loading');
                            iconDown.classList.remove('loading');
                            imgContainer.classList.remove('loading');
                            menu.classList.remove('loading');
                            CameraPreview.show();
                            icons.classList.remove('none');
                            iconMini.classList.remove('none');
                            iconsNext.classList.add('none');
                        }, 3300);
                    }
                    
                },
                beforeLeave(){
                    let background = document.getElementById("particles-js");
                    CameraPreview.stopCamera();
                    background.classList.remove('none');
                    body.classList.remove('black');
                }
            },
        ],
    });

    // background splash config
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                "enable": true,
                "value_area": 650
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 7,
                    "size_min": 0.7991497047141839,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 60,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": false
    });


}
