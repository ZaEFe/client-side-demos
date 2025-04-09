// Router function so this can work as an app in a container on my pages website
// function routeToPage(page) {
//     const appRouting = document.querySelector('.app-routing');
//     appRouting.innerHTML = ''; 

//     fetch(`../html/${page}.html`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Page Not Found. Fix the URLS in the CODE!');
//             }
//             return response.text();
//         })
//         .then(html => {
//             appRouting.innerHTML = html;
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }




document.addEventListener("DOMContentLoaded", () => {
    // Other functions and code you have already written...

    function startButton() {
        // First hide everything on the page
        const welcomeInfo = document.querySelectorAll('.welcome, #welcome');
        welcomeInfo.forEach(element => {
            element.style.display = 'none'; // Hide the welcome text
        });
    
        welcomeInfo.forEach(element => {
            element.remove(); // Completely removes the element from the DOM
        });
    
        // Take a one second "loading" pause before proceeding
        setTimeout(() => {
            console.log('Loading...');
        }, 2000);
    
        // Begin the intro "clip/animation"
        // Create the intro clip
        const introClip = document.createElement('div');
        introClip.className = 'intro';
        introClip.innerHTML = `
            <h1 class="logo-header"> 
                <span class="logo">NRCC</span>
                <span class="logo">Jeopardy</span>
            </h1>
        `;
        const introClip2 = document.createElement('header');
        introClip2.innerHTML = `
            <h4>NRCC Jeopardy</h4>
        `;
        // Add the logo to the body
        document.body.appendChild(introClip);
        document.body.appendChild(introClip2);
    
        // make "animation"
        let intro = document.querySelector('.intro');
        let logo = document.querySelector('.logo-header');
        
    
        setTimeout(() => {
            let logoSpan = document.querySelectorAll('.logo');
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active');
                }, (idx + 1) * 400);
            });
    
        // Slide up to the top left corner
        setTimeout(() => {
            introClip.classList.add('slide-up');
        }, (logoSpan.length + 1) * 400);
    
        setTimeout(() => {
            routeToPage('setup')
        }, (logoSpan.length + 1) * 400 + 1000);
    }, 100);
        
    }

    const startAppButton = document.getElementById('start_app');
    if (startAppButton) {
        startAppButton.addEventListener('click', startButton);
    } else {
        console.error("Error: #before_start element not found.");
    }
});

// This function is to begin the intro screen
// function startButton() {
//     // First hide everything on the page
//     const welcomeInfo = document.querySelectorAll('.welcome, #welcome');
//     welcomeInfo.forEach(element => {
//         element.style.display = 'none'; // Hide the welcome text
//     });

//     welcomeInfo.forEach(element => {
//         element.remove(); // Completely removes the element from the DOM
//     });

//     // Take a one second "loading" pause before proceeding
//     setTimeout(() => {
//         console.log('Loading...');
//     }, 2000);

//     // Begin the intro "clip/animation"
//     // Create the intro clip
//     const introClip = document.createElement('div');
//     introClip.className = 'intro';
//     introClip.innerHTML = `
//         <h1 class="logo-header"> 
//             <span class="logo">NRCC</span>
//             <span class="logo">Jeopardy</span>
//         </h1>
//     `;
//     const introClip2 = document.createElement('header');
//     introClip2.innerHTML = `
//         <h4>NRCC Jeopardy</h4>
//     `;
//     // Add the logo to the body
//     document.body.appendChild(introClip);
//     document.body.appendChild(introClip2);

//     // make "animation"
//     let intro = document.querySelector('.intro');
//     let logo = document.querySelector('.logo-header');
    

//     setTimeout(() => {
//         let logoSpan = document.querySelectorAll('.logo');
//         logoSpan.forEach((span, idx) => {
//             setTimeout(() => {
//                 span.classList.add('active');
//             }, (idx + 1) * 400);
//         });

//     // Slide up to the top left corner
//     setTimeout(() => {
//         introClip.classList.add('slide-up');
//     }, (logoSpan.length + 1) * 400);

//     setTimeout(() => {
//         routeToPage('setup')
//     }, (logoSpan.length + 1) * 400 + 1000);
// }, 100);
    
// }

