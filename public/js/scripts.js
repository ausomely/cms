/*!
* Start Bootstrap - Blog Home v5.0.2 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const fadeTarget = document.getElementsByClassName('auto-hide')[0];

if (window.location.href.indexOf('http://localhost:3000/login') > -1 && fadeTarget) {  
    (function fadeOut() {
        let fade = setInterval(function() {
            if(!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fade);
                fadeTarget.style.display = 'none';
            }
        }, 200);
    })();
}


