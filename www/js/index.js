
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    
    console.log('Ready - Running cordova-' + cordova.platformId + '@' + cordova.version);

    document.getElementById('deviceready').classList.add('ready');
    let body = document.querySelector('.body');
    
    var data;


    // transition page
    barba.init({
        views: [
            {
                namespace: 'splash',
                beforeEnter() {
                    // console.log('enter');
                    
                },
                beforeLeave(){
                    // console.log('leave');
                    body.classList.add('black');
                }
            },
            {
                namespace: 'camera',
                beforeEnter() {
                    console.log(location.pathname);
                    // CameraPreview.show();
                    // console.log('enter-camera');
                    // catturo gli elementi che mi servono
                    let btncamera = document.querySelector(".takephoto");
                    let btnswitch = document.querySelector(".switch");
                    let photoTaked = document.querySelector(".taked");
                    let icons = document.querySelector(".icons");
                    let iconMini = document.querySelector(".icon-mini");
                    let iconsNext = document.querySelector(".icons-next");
                    let iconBack = document.querySelector(".icon-back");
                    let iconSend = document.querySelector(".icon-send");
                    let iconFlash = document.querySelector(".flash");

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
                        tapFocus: false,
                        storeToFile: false,
                    });

                    CameraPreview.setFlashMode(iconFlash.value);

                    // rimango in ascolto del click sul bottone camera
                    btncamera.addEventListener("click", function(){
                        photoTaked.src = '';
                        icons.classList.add('none');
                        iconMini.classList.add('none');
                        CameraPreview.takePicture(function(imgData){
                            
                            photoTaked.src = 'data:image/jpeg;base64,' + imgData;
                            // console.log(data);
                            // console.log(window.location);
                        });
                        CameraPreview.hide();
                        iconsNext.classList.remove('none');
                    });

                    iconBack.addEventListener("click", function(){
                        CameraPreview.show();
                        icons.classList.remove('none');
                        iconMini.classList.remove('none');
                        iconsNext.classList.add('none');
                    });

                    iconSend.addEventListener("click", function(){
                        setTimeout(() => {
                            alert ('Image Sent!');
                            CameraPreview.show();
                            icons.classList.remove('none');
                            iconMini.classList.remove('none');
                            iconsNext.classList.add('none');
                        }, 2000);
                        
                    });

                    iconFlash.addEventListener("click", function(){
                        if (this.value === 'on') {
                            this.value = 'off';
                            this.src = '../assets/flashOff.svg';
                            CameraPreview.setFlashMode('off');
                        } else {
                            this.value = 'on';
                            this.src = '../assets/flashOn.svg';
                            CameraPreview.setFlashMode('on');
                        }
                    });

                    // scelgo se utilizzare la camera principale o frontale
                    btnswitch.addEventListener("click", function(){
                        CameraPreview.switchCamera();
                    });

                    
                },
                beforeLeave(){
                    CameraPreview.stopCamera();
                    body.classList.remove('black');
                }
            },
        ],
    });


}
