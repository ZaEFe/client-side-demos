// FUNCTIONS FOR jeopardy_app.html

document.addEventListener("DOMContentLoaded", () => {
    function loadStyleSheet(href) {
        if (![...document.styleSheets].some(sheet => sheet.href?.includes(href))) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }
    }

    function loadScript(src) {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) existing.remove();

        const script = document.createElement("script");
        script.src = src;
        script.type = "module";
        document.body.appendChild(script);
    }
    
    function routeToPage(page) {
        const outputJeopardy = document.getElementById('output_jeopardy');
        
        if (!outputJeopardy) {
            console.error("Error: #output_jeopardy container not found.");
            return;
        }

        outputJeopardy.innerHTML = ''; 

        fetch(`./appPages/${page}.html`) // Adjusted the path to match the relative structure
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page Not Found. Fix the URLs in the CODE!');
                }
                return response.text();
            })
            .then(html => {
                outputJeopardy.innerHTML = html;

                loadStyleSheet(`./appPages/jeopardy.css`); // Ensure the CSS path is correct
                loadScript(`./`); // Ensure the JS path is correct
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Load the game in the window
    function start_jeopardy() {
        const startButton = document.getElementById("start_jeopardy");

        if (!startButton) {
            console.error("Error: Start button not found.");
            return;
        }

        startButton.addEventListener("click", () => {
            routeToPage('start_screen'); // Ensure this matches an actual file
        });
    }

    start_jeopardy(); // Run after DOM is fully loaded
});

function startButton() {
    // This function is to begin the intro screen
    document.getElementById('start_app').addEventListener('click', startButton);

    // First hide everything on the page
    const welcomeInfo = document.querySelectorAll('.welcome', '#welcome');
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
        routeToPage(setup)
    }, (logoSpan.length + 1) * 400 + 1000);
}, 100);
    
}


///OLD LAYOUT CHANGED WHILE DEBUGGING
// PAGE ROUTER
// function routeToPage(page) {
//     const outputJeopardy = document.querySelector('output_jeopardy');
    
//     // debugging
//     if (!outputJeopardy) {
//         console.error("output_jeopardy not found")
//     }

//     outputJeopardy.innerHTML = ''; 

//     fetch(`./appPages/${page}.html`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Page Not Found. Fix the URLS in the CODE!');
//             }
//             return response.text();
//         })
//         .then(html => {
//             outputJeopardy.innerHTML = html;
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

// // Allows start button to make the container for the game
// function start_game() {
//     const startButton = document.getElementById("start_jeopardy");
    

//     startButton.addEventListener("click", () => {
//         routeToPage('start_screen');    
//     });
// }

// // FUNCTIONS FOR WITHIN the app use
// document.addEventListener("DOMContentLoaded", start_game);

