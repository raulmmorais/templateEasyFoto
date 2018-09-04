if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log("Nice")
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}else {
  console.log('Sorry');
  mensagem = "<b>O navegador não suporta esse serviço</b>"
  document.getElementById('msg').innerHTML = mensagem
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // files is a FileList of File objects. List some properties.
  for (var i = 0, f; f = files[i]; i++) {
    if (!f.type.match('image.*')) {
        continue;
    }
    var reader = new FileReader()
    reader.onload = (function(theFile){
      return function(e){
        var span = document.createElement('span')
        span.innerHTML = ['<a href="#" onclick="callFileToCrop(this)">'+
        '<img class="thumb" src="', e.target.result,
        '" title="', escape(theFile.name), '"/></a>'].join('')
        document.getElementById('list').insertBefore(span, null)
      }
    })(f)
    reader.readAsDataURL(f);
  }
}
function callFileToCrop(element){
  img = element.firstElementChild
  file = null
  fetch(img.src)
  .then(res => res.blob())
  .then(blob => {
    file = new File([blob], 'cars.jpg', blob)
    handleFileToCrop(file)
  })
}
//handleFileToCrop(document.getElementById(\'files\').files['+ idImg +'])
