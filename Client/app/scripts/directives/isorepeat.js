'use strict';

angular.module('ClientApp').directive('isoRepeat', function ($timeout) {
    return {
        scope: {
            items: '=isoRepeat'
        },
        template: '<article data-ng-repeat="post in items" class="small-6 medium-4 large-3 columns item {{post.category | lowercase}}">' +
                    '<header>' +
                        '<div>' +
                            '<img data-ng-src="{{ post.image }}" />' +
                        '</div>'+

                        '<span class="{{post.category | lowercase}}"></span>' +
                        '<span class="arrow-up"></span>' +
                    '</header>' +
                    '<footer>' +
                        '<h4><a ui-sref="post({ id:post._id })">{{ post.title }}</a></h4>' +
                        '<time>{{ 1288323623006 | cdate:\'MMMM D, YYYY\' }}</time>' +
                    '</footer>' +
                  '</article>',

        link: function postLink(scope, element, attrs) {
            var options = {
                animationEngineString: 'best-available',
                itemSelector: '.item',
                layoutMode: 'fitRows'
            };

            element.isotope(options);

            scope.$watch('items', function(newVal, oldVal){
                element.isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
            },true);

            $('#filters').on( 'click', 'button', function( event ) {
                var filtr = $(this).attr('data-filter');

                element.isotope({
                    filter: filtr
                });

                return false;
            });
        }
    };
});