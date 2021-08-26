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

// Fade out notifications on admin/posts page
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
        }, 200);
    })();
}

var createCategoryButtonTarget = document.getElementById("create-category-button");
var updateCategoryButtonTarget = document.getElementById("update-category-button");
var categoryTitleFormTarget = document.getElementById("category-title");
var categoryListTarget = document.getElementById('category-list');

// Create Category
if (window.location.href.indexOf('http://localhost:3000/admin/category/') > -1 && window.location.pathname.split('/').pop() === "") {
    createCategoryButtonTarget.addEventListener('click', event => {
        event.preventDefault();
        let catData = document.getElementById('category-title').value;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", '/admin/category/create', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onreadystatechange = function(response) {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 0 || (xhttp.status >= 200 && xhttp.status < 400)) {
                    let parseResponse = JSON.parse(xhttp.response);
                    console.log(parseResponse._id);
                    let html = 
        `
                                <tr>
                                    <td>${parseResponse.title}</td>
                                    <td class="d-flex justify-content-center">
                                        <a href="/admin/category/edit/${parseResponse._id}" class="btn btn-sm btn-warning mr-2">Edit</a>
                                        <form action="/admin/category/delete/${parseResponse._id}?newMethod=DELETE" method="post">
                                            <button class="btn btn-sm btn-danger" type="submit">Delete</button>
                                        </form>
                                    </td>
                                </tr>
        `;
                    console.log(parseResponse);
                    categoryListTarget.insertAdjacentHTML('beforeend', html);
                    categoryTitleFormTarget.value = "";                    
                } else {
                    console.warn('Did not recieve 200 OK from response');
                }
            }
        };
        xhttp.send('name=' + encodeURIComponent(catData));
    });
}

// Update Category
if (window.location.href.indexOf('http://localhost:3000/admin/category/') > -1 && window.location.pathname.split('/').pop() != "") {
    updateCategoryButtonTarget.addEventListener('click', event => {
        event.preventDefault();
        let catData = document.getElementById('category-title').value;
        let catId = document.getElementById('category-id').value;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", `/admin/category/edit/${catId}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onreadystatechange = function(response) {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 0 || (xhttp.status >= 200 && xhttp.status < 400)) {
                    let parseResponse = JSON.parse(xhttp.response);
                    console.log(parseResponse.url);
                    window.location.href = parseResponse.url;
                } else {
                    console.warn('Did not recieve 200 OK from response');
                }
            }
        };
        xhttp.send('name=' + encodeURIComponent(catData));
    });
}

// Fade out notifications on admin page
if (window.location.href.indexOf('http://localhost:3000/admin') > -1 && fadeTarget) {  
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

// const commentTogglerTarget = document.getElementById("approveCommentsToggler");

// // Toastr Options
// toastr.options = {
//     "closeButton": true,
//     "debug": false,
//     "newestOnTop": false,
//     "progressBar": false,
//     "positionClass": "toast-top-right",
//     "preventDuplicates": false,
//     "onclick": null,
//     "showDuration": "300",
//     "hideDuration": "1000",
//     "timeOut": "2000",
//     "extendedTimeOut": "1000",
//     "showEasing": "swing",
//     "hideEasing": "linear",
//     "showMethod": "fadeIn",
//     "hideMethod": "fadeOut"
// };


// if (window.location.href.indexOf('http://localhost:3000/admin/comment/') > -1) {
//     commentTogglerTarget.addEventListener('click', (event, data) => {
//         event.preventDefault();
//         var buttonData = data;
//         var id = commentTogglerTarget.getAttribute('data-id');
//         console.log(id);

//         const xhttp = new XMLHttpRequest();
//         xhttp.open("POST", '/admin/comment', true);
//         xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       
//         xhttp.onreadystatechange = function(response) {
//             if (xhttp.readyState === XMLHttpRequest.DONE) {
//                 if (xhttp.status === 0 || (xhttp.status >= 200 && xhttp.status < 400)) {
//                     toastr.success('RECORD updated');
//                 } else {
//                     toastr.error('RECORD failed to update');
//                 }
//             }
//         };

//         xhttp.send('data=' + encodeURIComponent(buttonData) + '&id=' + encodeURIComponent(id));

//     });
// }


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

$('#approveCommentsToggler').on('click', (e) => {
    var buttonData = e.target.checked;
    var id = e.target.getAttribute('data-id');
    $.ajax({
        url: '/admin/comment',
        type: 'POST',
        data: {data: buttonData, id: id},
        success: function (response) {
            if(response.toLowerCase() === 'ok')
            {
                toastr.success('RECORD updated');
            }
            else
            {
                toastr.error('RECORD failed to updated');
            }
        }
    });
});