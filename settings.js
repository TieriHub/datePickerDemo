(function() {
    function init() {
        // Get the settings container
        const settingsContainer = JFCustomWidget.getSettingsContainer();

        // Create elements
        const title = document.createElement("h3");
        title.textContent = "Widget Settings";

        const input = document.createElement("input");
        input.type = "text";
        input.id = "customInput";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.onclick = saveSettings;

        // Append elements
        settingsContainer.appendChild(title);
        settingsContainer.appendChild(input);
        settingsContainer.appendChild(saveButton);

        // Load existing settings if available
        loadSettings();
    }

    function saveSettings() {
        const customValue = document.getElementById("customInput").value;
        JFCustomWidget.sendData({
            customProperty: customValue
        });
    }

    function loadSettings() {
        JFCustomWidget.getWidgetSettings((settings) => {
            if (settings.customProperty) {
                document.getElementById("customInput").value = settings.customProperty;
            }
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();
