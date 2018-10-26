(function(){
  easyApp.component("thumb", {
    bindings:{
      src: '=',
      red: '=',

    },
    template:`
      <img ng-src="{{$ctrl.src}}" class="imagePreview {{$ctrl.red}}"/>
      <div class="thumb-buttons">
        <input class="btn btn-min btn-purple" type="button" value="Ajustar" ng-click="ctrl.cropImage($index)"/>
        <input class="btn btn-min btn-purple" type="button" value="Remover" ng-click="ctrl.deleteImage($index)"/>
      </div>
    `
  })
})()
