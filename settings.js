(function() {
    // Define the options for the widget settings
    const options = {
      QuestionLabel: {
        type: "String",
        label: "Question Label",
        description: "The label for the question.",
        value: ""
      },
      AllowedDates: {
        type: "String",
        label: "Allowed Dates",
        description: "Comma-separated list of allowed dates in yyyy-mm-dd format.",
        value: ""
      }
    };
  
    // Function to send the options as JSON
    function sendOptions() {
      const jsonOptions = JSON.stringify(options);
      document.body.innerHTML = jsonOptions;
    }
  
    // Call the function to send options
    sendOptions();
  })();