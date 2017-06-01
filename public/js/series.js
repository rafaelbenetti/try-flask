/* jshint esversion: 6*/
let Series = (function () {
    'use strict';

    function init() {
        find();
    }

    function find() {
        HttpRequest({
                url: Urls.SERIES
            })
            .then((data) => {
                createItens(data.result);
            });
    }

    function createItens(itens) {
        itens.map(createItem);
    }

    function createItem(item) {
        let template = document.querySelector('#templates .serie').cloneNode(true);
        
        template.querySelector('.serie-cover').src = item.coverImage;    
        template.querySelector('.serie-title').innerHTML = item.name;
        template.querySelector('.serie-seasons > span').innerHTML = item.numberOfSeasons;       
        
        item.genre.map((genre) => {
            let span = document.querySelector('#templates .serie-genre').cloneNode(true);
            span.innerHTML = genre;
            template.querySelector('.serie-genres').appendChild(span);
        });

        document.getElementById('series').appendChild(template);
    }

    return {
        init
    };

})();