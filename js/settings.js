JFCustomWidget.subscribe("ready", function () {
    // Get the current settings when the settings panel is loaded
    let settings = JFCustomWidget.getWidgetSettings();
    
    // Create the input field for 'Date Disponibili'
    let allowedDatesInput = document.createElement('input');
    allowedDatesInput.type = 'text';
    allowedDatesInput.id = 'allowedDates';
    allowedDatesInput.value = settings.allowedDates || '';
    document.getElementById('settings-container').appendChild(allowedDatesInput);

    // Create the button for adding more dates
    let addDateButton = document.createElement('button');
    addDateButton.id = 'addDateButton';
    addDateButton.textContent = 'Aggiungi Data';
    document.getElementById('settings-container').appendChild(addDateButton);

    // Set up button click event
    addDateButton.addEventListener('click', function () {
        // Create a new input field when the button is clicked
        let newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'yyyy-mm-dd';
        document.getElementById('settings-container').appendChild(newInput);
    });

    // Save the updated settings
    JFCustomWidget.saveWidgetSettings({
        allowedDates: allowedDatesInput.value
    });
});
