function isSameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  // Sottoscrizione all'evento "ready" fornito dall'API di JotForm
  JFCustomWidget.subscribe("ready", function(formId, value) {
    
    // Imposta il titolo: utilizza il parametro "QuestionLabel" se disponibile, altrimenti usa il valore predefinito
    let label = JFCustomWidget.getWidgetSetting('QuestionLabel') || 'Seleziona una data per l\'appuntamento';
    document.getElementById('header').innerHTML = label;
    
    // Recupera il parametro "AllowedDates" (atteso come stringa separata da virgole, nel formato gg/mm/yy)
    let allowedDate = JFCustomWidget.getWidgetSetting('AllowedDates');
    let allowedDateObj = new Date(allowedDate);
    
    // Inizializza il Datepicker di jQuery UI con il formato gg/mm/yy
    $("#datepicker").datepicker({
      dateFormat: 'dd/mm/yy',
      beforeShowDay: function(date) {
        // Verifica se la data corrente è tra quelle consentite
     let allowed = isSameDate(date, allowedDateObj);

       if (allowed) {
         return [true, "available-day", "Disponibile"];
       }
        return [false, "unavailable-day", "Non disponibile"];
      },
      onSelect: function(dateText, inst) {
        console.log("Data selezionata: " + dateText);
      }
    });
    
    // Se esiste un valore pre-esistente (ad esempio, in fase di modifica), lo pre-seleziona
    if (value) {
      try {
        var preselectedDate = $.datepicker.parseDate('dd/mm/yy', value);
        $("#datepicker").datepicker("setDate", preselectedDate);
      } catch (e) {
        console.warn("Impossibile analizzare la data pre-selezionata:", value);
      }
    }
    
    // (Opzionale) Ridimensiona l'iframe se necessario
    // JFCustomWidget.requestFrameResize({ height: document.body.scrollHeight });
  });
  
  // Sottoscrizione all'evento "submit" per inviare il valore selezionato a JotForm
  JFCustomWidget.subscribe("submit", function() {
    var selectedDate = $("#datepicker").datepicker("getDate");
    if (!selectedDate) {
      JFCustomWidget.sendSubmit({ valid: false, value: "" });
    } else {
      var formattedDate = $.datepicker.formatDate('dd/mm/yy', selectedDate);
      JFCustomWidget.sendSubmit({ valid: true, value: formattedDate });
    }
  });