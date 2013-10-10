'use strict';

var CKEDITOR = CKEDITOR || {};

angular.module('ClientApp').directive('editor', function() {
  return {
    scope: {
      description: '@',
      content: '@'
    },
    restrict: 'C',
    link: function(scope, element, attrs) {
      var id = element.prop('id');

      CKEDITOR.replace( id, {
        toolbar: 'Basic'
      });

      attrs.$observe('description', function(val) {
        CKEDITOR.on( 'instanceReady', function(ev) {
          // console.log(ev);
          if ( ev.editor.name === 'description' ) {
            ev.editor.setData( $('#description').attr('description') );
          }
        });
      });

      attrs.$observe('content', function(val) {
        CKEDITOR.on( 'instanceReady', function(ev) {
          if ( ev.editor.name === 'content' ) {
            ev.editor.setData( $('#content').attr('content') );
          }
        });
      });
    }
  };
});