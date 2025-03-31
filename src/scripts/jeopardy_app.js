// FUNCTIONS FOR jeopardy_app.html

document.addEventListener("DOMContentLoaded", () => {
    function routeToPage(page) {
        const outputJeopardy = document.getElementById('output_jeopardy');
        
        if (!outputJeopardy) {
            console.error("Error: #output_jeopardy container not found.");
            return;
        }

        outputJeopardy.innerHTML = ''; 

        fetch(`./appPages/${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page Not Found. Fix the URLs in the CODE!');
                }
                return response.text();
            })
            .then(html => {
                outputJeopardy.innerHTML = html;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function start_game() {
        const startButton = document.getElementById("start_jeopardy");

        if (!startButton) {
            console.error("Error: Start button not found.");
            return;
        }

        startButton.addEventListener("click", () => {
            routeToPage('start_screen'); // Ensure this matches an actual file
        });
    }

    start_game(); // Run after DOM is fully loaded
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

