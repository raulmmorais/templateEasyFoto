(function () {
    easyApp.controller('appController', [
        '$scope',
        '$http',
        'fileReader',
        AppController
    ])
    function AppController($scope, $http, fileReader) {
        const vm = this;
        vm.title = "Escolha as imagens do seu computador"
        vm.result = [];

        vm.getImages = function(){
          console.log("Metodo getImages()");
          const element = document.getElementById('files')
          let files = element.files
          for (var i = 0; i < files.length; i++) {
            vm.result.push({"name": files[i].name, "image": fileReader.readAsDataUrl(files[i], $scope)});
          }
          element.value = ""
        }

        vm.deleteImage = function(index){
          vm.result.splice(index, 1)
        }

        vm.cropImage = function(index){
          let src = vm.result[index]
          let file = null;
          fetch(src.image.$$state.value)
          .then(res => res.blob())
          .then(blob => {
            file = new File([blob], src.name , blob)
            handleFileToCrop(file)
          })
        }
    }
})()
