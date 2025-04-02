function routeToPage(page) {
    const appRouting = document.querySelector('.app-routing');
    appRouting.innerHTML = ''; 
    

    fetch(`../html/${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page Not Found. Fix the URLS in the CODE!');
            }
            return response.text();
        })
        .then(html => {
            appRouting.innerHTML = html;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}