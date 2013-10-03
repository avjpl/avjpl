'use strict';

angular.module('ClientApp').directive('editor', function () {
  return {
    scope: {},
    // template: '<div></div>',
    restrict: 'C',
    link: function(scope, element, attrs) {
      var id = element.prop('id');
      var editor;

      CKEDITOR.replace( id, {
          toolbar: 'Basic'
      });

      CKEDITOR.on( 'instanceReady', function(ev) {
          editor = CKEDITOR.instances[id];
      });
    }
  };
});