
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
                    // console.log('enter-camera');
                    // catturo gli elementi che mi servono
                    let btncamera = document.querySelector(".takephoto");
                    let btnswitch = document.querySelector(".switch");
                    let photoTaked = document.querySelector(".taked");

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

                    // rimango in ascolto del click sul bottone camera
                    btncamera.addEventListener("click", function(){
                        CameraPreview.takePicture(function(imgData){
                            photoTaked.src = 'data:image/jpeg;base64,' + imgData;
                            data = imgData;
                            CameraPreview.hide();
                            console.log(data);
                        });
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
            {
                namespace: 'postshot',
                beforeEnter() {
                    // console.log('enter-post');
                    console.log(data);
                },
                beforeLeave(){
                    // console.log('leave');
                    
                }
            },
        ],
    });


}
