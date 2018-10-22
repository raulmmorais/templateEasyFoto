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
        vm.images = [];
        vm.index = 0;
        vm.files = null;

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
            vm.handleFileToCrop(file, index)
          })
        }

        vm.test3 = function(){
            console.log("método test3()")
            vm.files = document.getElementById('files').files;
            for (var i = 0; i < files.length; i++) {
                vm.result.push({"name": files[i].name, "image": fileReader.readAsDataUrl(files[i], $scope)});
            }
            vm.reader(vm.files[vm.index])
        }
        vm.test4 = function(){
            if(crop.isImageSet()){
                var img = crop.getCroppedImage(600, 600);
                //img.className = "imagePreview"
                img.onload = (function () {
                    console.log("add images");
                    return vm.addCropedImage(img);
                });
            }
        }
        vm.reader = function(file){
            var img = new Image();
            var reader = new FileReader();
            img.addEventListener("load", function(){
                crop.setImage(img);
                vm.test4();
            }, false);
            reader.onload = function(){
                img.src = reader.result;
            }
            if(file){
                reader.readAsDataURL(file)
            }
        }
        vm.addCropedImage = function(img){
            if(img){
                console.log('add cropped image')
                vm.index++
                vm.images.push({"src": img.src});
                vm.reader(vm.files[vm.index]);
            }
        }

        vm.test = function(){
            console.log("metodo test()")
            const files = document.getElementById('files').files;
            var reader = new FileReader();
            var img = new Image();
            img.addEventListener("load", function(){
                crop.setImage(img);
                vm.test2();
            }, false);
            reader.onload = function(){
                img.src = reader.result;
            }
            if(files[0]){
                reader.readAsDataURL(files[0])
            }
        }
        vm.test2 = function(){
            if(crop.isImageSet()){
                var img = crop.getCroppedImage(600, 600);
                img.className = "imagePreview"
                img.onload = (function () { return previewLoaded(img); });
            }
        }

        vm.handleFileToCrop = function(file, index){
            var reader = new FileReader();
            var img = new Image();
            img.addEventListener("load", function () {
                crop.setImage(img);
                vm.preview(index);
            }, false);
            reader.onload = function () {
                img.src = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }

        vm.preview = function(){
            if (crop.isImageSet()) {
                var img = crop.getCroppedImage(600, 600);
                img.className = "imagePreview"
                img.onload = (function () { return previewLoaded(img); });
            }
        }
    }
})()
function previewLoaded(img) {
    if (img) {
        document.getElementById("preview").appendChild(img);
    }
}
