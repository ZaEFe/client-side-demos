function updateTimeElement() {
    const timeElement = document.querySelector("time");
    const timeOfNow = Date.now();
    timeElement.textContent = new Date(timeOfNow).toLocaleTimeString();
    timeElement.dateTime = new Date(timeOfNow).toISOString();
}

function recursiveUpdate() {
    updateTimeElement();
    setTimeout(() => {    
        recursiveUpdate();
    }, 1000);
}

recursiveUpdate();