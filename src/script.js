document.addEventListener("DOMContentLoaded", function () {
    const costForm = document.getElementById("costForm");
    const costList = document.getElementById("costList");

    costForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const sum = document.getElementById("sum").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;

        const costItem = document.createElement("div");
        costItem.classList.add("cost-item");
        costItem.innerHTML = `<strong>Category:</strong> ${category}<br><strong>Sum:</strong> ${sum}<br><strong>Description:</strong> ${description}`;

        costList.appendChild(costItem);

        costForm.reset();
    });
});
