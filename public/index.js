 /*jshint esversion: 6 */ 
(function() {
    'use strict';

    const PORT = 3000;
    let express = require('express');
    let app = express();

    app.use(express.static('../public'));

    app.listen(PORT, () => {
        console.log(`Runnig static server at ${PORT}`);
    });
})();