(function () {
    easyApp.controller('appController', [
        '$scope',
        '$http',
        AppController
    ])
    function AppController($scope, $http) {
        const vm = this;
        vm.files = new Array();
        vm.haveFiles = false;
        vm.names = [{}]

        $scope.handleFileSelect = function (element) {

            var files = element.files;
            vm.haveFiles = true
            for(let i = 0, f; f = files[i] ; i++){
                if (!f.type.match('image.*')) {
                    console.log("Selecione apenas imagens");
                    continue;
                }
                const reader = new FileReader();
                reader.onload = (function (theFile) {
                    return function(e){
                        vm.files.push({"src": e.target.result, "title": theFile.name})
                        vm.names.push({"nameFile": theFile.name})
                        console.log(theFile.name)
                    }
                })(f)
                reader.readAsDataURL(f);
            }
            element.value = ""
        }
    }
})()