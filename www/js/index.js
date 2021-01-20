
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);



function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    
    console.log('Ready - Running cordova-' + cordova.platformId + '@' + cordova.version);

    document.getElementById('deviceready').classList.add('ready');

    // transition page
    barba.init({
        views: [
            {
                namespace: 'splash',
                beforeEnter() {
                    console.log('enter');
                    
                },
                beforeLeave(){
                    console.log('leave');
                }
            },
            {
                namespace: 'camera',
                beforeEnter() {
                    console.log('enter-camera');

                    let btncamera = document.getElementById("camerastart");

                    btncamera.addEventListener("click", function(){
                        console.log('enter-camera');
                        CameraPreview.startCamera({
                            x: 0, 
                            y: 80, 
                            width: window.screen.width, 
                            height: window.screen.height - 210, 
                            camera: "back", 
                            tapPhoto: true, 
                            previewDrag: false, 
                            toBack: false
                        });
                        
                    });
                },
                beforeLeave(){
                    
                }
            },
        ],
    });


}
