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
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong><a href="#" onclick="handleFileToCrop(document.getElementById(\'files\').files['+ i +'])">', escape(f.name), '</a></strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
