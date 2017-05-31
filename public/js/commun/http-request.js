 /*jshint esversion: 6 */
 let HttpRequest = (function () {
     'use strict';

     let request = settings => {
         return new Promise((resolve, reject) => {
             let xhr = new XMLHttpRequest();
             xhr.open(settings.method || "GET", settings.url);
             if (settings.headers) {
                 Object.keys(settings.headers).forEach(key => {
                     xhr.setRequestHeader(key, settings.headers[key]);
                 });
             }
             xhr.onload = () => {
                 if (xhr.status >= 200 && xhr.status < 300) {
                     resolve(JSON.parse(xhr.response));
                 } else {
                     reject(xhr.statusText);
                 }
             };
             xhr.onerror = () => reject(xhr.statusText);
             xhr.send(settings.body);
         });
     };

     return request;
 })();