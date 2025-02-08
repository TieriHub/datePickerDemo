(function() {
    function init() {
        // Create the settings form dynamically
        const container = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = "Widget Settings";

        const input = document.createElement("input");
        input.type = "text";
        input.id = "customInput";
        input.placeholder = "Enter a value";

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.onclick = saveSettings;

        // Append elements
        container.appendChild(title);
        container.appendChild(input);
        container.appendChild(saveButton);

        document.body.appendChild(container);

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
            if (settings && settings.customProperty) {
                document.getElementById("customInput").value = settings.customProperty;
            }
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();
