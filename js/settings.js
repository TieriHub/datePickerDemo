document.addEventListener("DOMContentLoaded", function () {
    let dateList = document.getElementById("dateList");
    let addDateBtn = document.getElementById("addDate");

    // Load existing dates from settings
    let allowedDates = JFCustomWidget.getWidgetSetting('AllowedDates') || [];

    function renderDates() {
        dateList.innerHTML = "";
        allowedDates.forEach((date, index) => {
            let div = document.createElement("div");
            div.innerHTML = `
                <input type="date" value="${date}" class="date-input" data-index="${index}">
                <button type="button" class="removeDate" data-index="${index}">❌</button>
            `;
            dateList.appendChild(div);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll(".removeDate").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                allowedDates.splice(index, 1);
                saveDates();
                renderDates();
            });
        });

        // Update values when changed
        document.querySelectorAll(".date-input").forEach(input => {
            input.addEventListener("change", function () {
                let index = this.getAttribute("data-index");
                allowedDates[index] = this.value;
                saveDates();
            });
        });
    }

    function saveDates() {
        JFCustomWidget.setSettings({ AllowedDates: allowedDates });
    }

    addDateBtn.addEventListener("click", function () {
        allowedDates.push("");
        renderDates();
    });

    renderDates(); // Render initial state
});
