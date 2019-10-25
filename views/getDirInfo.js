var addImageButton = document.getElementById("createdfolder") ;
alert("projectTitle");
let projectTitle;
addImageButton.onclick( function(){
    projectTitle=  document.getElementById("Projecttitle").value;
    document.getElementById("addImagetoProjectButton").value = projectTitle;
    alert("projectTitle");

});
// images related logic.
// API request.
var getImageAnno = document.getElementById("getImagesForAnnotation");
getImageAnno.addEventListener("click",loadImages());

function loadImages() {
    var url = `public/uploads/createfolders?projectTitle=${projectTitle}`;
    var headers = new Headers({'X-Mashape-Key': 'API_KEY'});
    var options = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
    };
    var request = new Request(url);

    fetch(request, options).then((response) => {
    response.arrayBuffer().then((imageBuffers) => {
        imageBuffers.forEach((imageBuffer, index) => {
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = arrayBufferToBase64(buffer);
        
            document.getElementById(`image-${index}`).src = base64Flag + imageStr;
        });
        // annotate image
    });
    });

    function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary);
    };
    alert("projectTitle");
    

}