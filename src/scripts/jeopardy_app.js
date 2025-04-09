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

        fetch(`/client-side-demos/appPages/${page}.html`) // Adjusted the path to match the relative structure
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page Not Found. Fix the URLs in the CODE!');
                }
                return response.text();
            })
            .then(html => {
                outputJeopardy.innerHTML = html;

                loadStyleSheet(`/client-side-demos/appPages/jeopardy.css`); // Ensure the CSS path is correct
                loadScript(`/client-side-demos/appPages/${page}.js`); // Ensure the JS path is correct
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    window.routeToPage = routeToPage;

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

