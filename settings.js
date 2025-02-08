(function() {
    function init() {
        // Get the settings container
        const settingsContainer = JFCustomWidget.getSettingsContainer();

        // Create elements
        const title = document.createElement("h3");
        title.textContent = "Available Dates Settings";

        const input = document.createElement("input");
        input.type = "date";
        input.id = "dateInput";

        const addButton = document.createElement("button");
        addButton.textContent = "Add Date";
        addButton.onclick = addDate;

        const listContainer = document.createElement("ul");
        listContainer.id = "dateList";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.onclick = saveSettings;

        // Append elements
        settingsContainer.appendChild(title);
        settingsContainer.appendChild(input);
        settingsContainer.appendChild(addButton);
        settingsContainer.appendChild(listContainer);
        settingsContainer.appendChild(saveButton);

        // Load existing settings if available
        loadSettings();
    }

    let selectedDates = [];

    function addDate() {
        const dateInput = document.getElementById("dateInput");
        const dateValue = dateInput.value;

        if (dateValue && !selectedDates.includes(dateValue)) {
            selectedDates.push(dateValue);
            updateDateList();
        }
    }

    function updateDateList() {
        const listContainer = document.getElementById("dateList");
        listContainer.innerHTML = "";

        selectedDates.forEach((date, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = date;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = () => {
                selectedDates.splice(index, 1);
                updateDateList();
            };

            listItem.appendChild(removeButton);
            listContainer.appendChild(listItem);
        });
    }

    function saveSettings() {
        JFCustomWidget.sendData({
            dates: selectedDates
        });
    }

    function loadSettings() {
        JFCustomWidget.getWidgetSettings((settings) => {
            if (settings.dates) {
                selectedDates = settings.dates;
                updateDateList();
            }
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();
