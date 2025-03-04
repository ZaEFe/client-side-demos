document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchAPI");
    const outputDiv = document.getElementById("outputAPI");

    fetchButton.addEventListener("click", () => {
        outputDiv.innerHTML = "<p>Loading data...</p>";

        fetch("https://jsonplaceholder.typicode.com/comments?_limit=5")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                outputDiv.innerHTML = "";
                data.forEach(comment => {
                    const commentElement = document.createElement("div");
                    commentElement.classList.add("comment");
                    commentElement.innerHTML = `
                        <p><strong>${comment.name}</strong> (${comment.email})</p>
                        <p>${comment.body}</p>
                        <hr>
                    `;
                    outputDiv.appendChild(commentElement);
                });
            })
            .catch(error => {
                outputDiv.innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
            });
    });
});
