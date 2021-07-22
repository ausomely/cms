/*!
    * Start Bootstrap - SB Admin v7.0.2 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

const fadeTarget = document.getElementsByClassName('auto-hide')[0];

if (window.location.href.indexOf('http://localhost:3000/admin/posts') > -1 && fadeTarget) {  
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
        }, 100);
    })();
}

var categoryButtonTarget = document.getElementById("create-category-button");
var categoryListTarget = document.getElementById('category-list');

if (window.location.href.indexOf('http://localhost:3000/admin/category/') > -1) {
    categoryButtonTarget.addEventListener('click', event => {
        event.preventDefault();
        let catData = document.getElementById('category-title').value;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", '/admin/category', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onreadystatechange = function(response) {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 0 || (xhttp.status >= 200 && xhttp.status < 400)) {
                    let parseResponse = JSON.parse(xhttp.response);
                    let html = 
        `
                                <tr>
                                    <td>${parseResponse.title}</td>
                                    <td class="d-flex justify-content-center">
                                        <a href="/admin/categories/edit/${parseResponse.id}" class="btn btn-sm btn-warning mr-2">Edit</a>
                                        <form action="/admin/categories/${parseResponse.id}?_method=DELETE" method="post">
                                            <button class="btn btn-sm btn-danger" type="submit">Delete</button>
                                        </form>
                                    </td>
                                </tr>
        `;
                    console.log(JSON.parse(xhttp.response));
                    categoryListTarget.insertAdjacentHTML('beforeend', html);
                } else {
                    console.warn('Did not recieve 200 OK from response');
                }
            }
        };
        xhttp.send('name=' + encodeURIComponent(catData));
    });
}