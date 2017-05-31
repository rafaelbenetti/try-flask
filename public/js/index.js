/* jshint esversion: 6*/
(function() {
    'use strict';

    function init() {
        HttpRequest({url: 'http://localhost:5000/series'})
        .then((data) => {
            console.log(data);
        });
    }

    init();
})();