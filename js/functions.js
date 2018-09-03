function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}
[2, 5, 9].forEach(logArrayElements);


files.files.forEach(function(el, i){
  console.log(i)
})

Array.prototype.forEach.call(files.files, function(f){
  console.log(f.name);
})
fileList = document.getElementById('fileInput')
url = URL.createObjectURL(file)
img = new Image()
document.getElementById('fileInput')
document.getElementById('list_thumb')
ctx = document.getElementById('canvas').getContext('2d');

//exemplo do que eu quero fazer
var input = document.getElementById('input');
input.addEventListener('change', handleFiles);

function handleFiles(e) {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function() {
        ctx.drawImage(img, 20,20);
        alert('the image is drawn');
    }
}

if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log("Nice")
}else {
  console.log('Sorry');
}
//convert image from tag to a file
file = null
fetch(img[0].src)
.then(res => res.blob())
.then(blob => {
  file = new File([blob], 'cars.jpg', blob)
  console.log(file)
})

handleFileToCrop(document.getElementById('files').files[0])
