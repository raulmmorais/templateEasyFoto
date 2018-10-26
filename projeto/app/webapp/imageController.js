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
        vm.index = 0;
        vm.atualIndex = 0;
        vm.valueToPay = 0;
        vm.qtdFrames = 0;

        vm.getImages = function(){
          console.log("Method getImages()");
          vm.index = vm.result.length;
          const element = document.getElementById('files')
          let files = element.files
          for (var i = 0; i < files.length; i++) {
            vm.result.push({"name": files[i].name, "image": fileReader.readAsDataUrl(files[i], $scope), "file": files[i]});
          }
          if(vm.result[vm.index]){
            vm.reader(vm.result[vm.index].file);
          }
          //element.value = ""
        }
        vm.reader = function(file){
          console.log("Method reader()");
          var img = new Image();
          var reader = new FileReader();
          img.addEventListener("load", function(){
            width = img.width;
            if(width < 1200){
              console.log("bad image");
              vm.result[vm.index].imgClass = "bad-image";
            }else{
              console.log("good image");
              vm.result[vm.index].imgClass = "";
            }
            vm.cropper(img)
          }, false);
          reader.onload = function(){
              img.src = reader.result;
          }
          if(file){
              reader.readAsDataURL(file)
          }
        }
        vm.cropper = function(img){
          console.log("Method cropper()");
          crop.setImage(img);
          var imgCropped = crop.getCroppedImage(600, 600);
          imgCropped.onload = (function(){
            vm.result[vm.index].croppedImage = imgCropped.src;
            vm.index++;
            vm.qtdFrames++
            if(vm.result[vm.index]){
              vm.reader(vm.result[vm.index].file);
            }else {
              console.log("end of line");
              setTimeout(function(){ vm.showNames(); }, 1000);
              //vm.qtdFrames = vm.result.length;
              vm.valueToPay = vm.getValueToPay(vm.qtdFrames);
            }
          });
        }
        vm.onLoadImage = function(index){
          console.log("index: ", index);
        }

        vm.getValueToPay = function(qtd){
            var value = qtd*25;
            return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
        }

        vm.deleteImage = function(index){
          vm.result.splice(index, 1);
          vm.qtdFrames--;
          vm.valueToPay = vm.getValueToPay(vm.qtdFrames);
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

        vm.handleFileToCrop = function(file, index){
            var reader = new FileReader();
            var img = new Image();
            img.addEventListener("load", function () {
              vm.atualIndex = index;
              crop.setImage(img);
              modal.fire();
            }, false);
            reader.onload = function () {
                img.src = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }

        vm.preview = function(index){
            if (crop.isImageSet()) {
                var img = crop.getCroppedImage(600, 600);
                //img.className = "imagePreview"
                img.onload = (function () { return vm.result[index].croppedImage = img.src;});
            }
        }

        vm.accept = function(){
          vm.preview(vm.atualIndex);
          modalContainer.style.display = ""
        }
        vm.cancelEdit = function(){
          modalContainer.style.display = ""
        }

        vm.showNames = function(){
          //vm.result.forEach(function(e, i){console.log(e.name)})
          modal.disable();
          console.log("Show names")
        }

        vm.pay = function(){
            console.log("Time to pay.")
        }
    }
})()
function previewLoaded(img) {
    if (img) {
        document.getElementById("preview").appendChild(img);
    }
}
var modalContainer = document.getElementById('ouibounce-modal')
var modal = ouibounce(modalContainer, {
    aggressive: true,
    //timer: 0,
    callback: function() {
        console.log('ouibounce fired!');
        modal.disable();
    }
});
var windowHeight = window.innerHeight;
var panelHeight = windowHeight - 168 - 115;
var panelPay = document.getElementById("panel-pay");
var panelImg = document.getElementById("panel-img");
panelPay.style.height = panelHeight + "px";
panelImg.style.height = panelHeight + "px";

//I will use https://github.com/carlsednaoui/ouibounce to create a modal.
//Do a test with https://robinparisi.github.io/tingle/ another modal plugin.
