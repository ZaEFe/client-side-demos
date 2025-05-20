function showAlert() {
    // Convert the timestamp to a readable date
    const date = new Date().toLocaleString();
    // Concat message with current date
    const message = `Hello, today's date is ${date}`;
    alert(message);
}

const dateButton = document.getElementById("dateButton");
dateButton.addEventListener("click", showAlert);

