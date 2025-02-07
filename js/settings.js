JFCustomWidget.subscribe("ready", function () {
    let settings = JFCustomWidget.getWidgetSettings();
    
    // Populate input field with saved dates
    document.getElementById("allowedDates").value = settings.AllowedDates || "";

    // Button to add more dates
    document.getElementById("addDateButton").addEventListener("click", function () {
        let inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "yyyy-mm-dd";
        document.getElementById("settings-container").appendChild(inputField);
    });
});
