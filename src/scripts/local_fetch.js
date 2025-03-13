document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("local_fetch");
    const outputDiv = document.getElementById("outputAPI");

    fetchButton.addEventListener("click", () => {
        outputDiv.innerHTML = "<p>Loading data...</p>";

        fetch("http://localhost:3003")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected data format");
                }

                outputDiv.innerHTML = "<h4>Randomly Generated Fetched Numbers:</h4>";
                const list = document.createElement("ul");
                
                data.forEach(num => {
                    const listItem = document.createElement("li");
                    listItem.textContent = num;
                    list.appendChild(listItem);
                });

                outputDiv.appendChild(list);
            })
            .catch(error => {
                if (error.message.includes("Failed to fetch")) {
                    outputDiv.innerHTML = "<p style='color:red;'>API server is not running. Please start the server.</p>";
                } else {
                    outputDiv.innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
                }
            });
    });
});
