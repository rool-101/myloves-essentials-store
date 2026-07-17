alert("Dashboard JS loaded");

const button = document.getElementById("saveProduct");

if (!button) {
    alert("Save button not found!");
} else {
    alert("Save button found!");

    button.addEventListener("click", () => {
        alert("Save button clicked!");
    });
}
