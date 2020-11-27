$('#btnSubmitEarthquakeApi').click(function() {

  $.ajax({
    url: "libs/php/getEarthquakeInfo.php",
    type: "POST",
    dataType: "json",

    success: function(phpOutput) {

      if (phpOutput.status.name == "ok") {

        $('#datetimeVal').html(phpOutput['data'][0]['datetime']);
        $('#magnitudeVal').html(phpOutput['data'][0]['magnitude']);
        $('#depthVal').html(phpOutput['data'][0]['depth']);
        $('#latitudeVal').html(phpOutput['data'][0]['lat']);
        $('#longitudeVal').html(phpOutput['data'][0]['lng']);
      }

    },

  });

});


$('#btnSubmitNeighbourApi').click(function() {

  $.ajax({
    url: "libs/php/getNeighbourInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      countryCode: $("#neighbourIsoInput").val()
    },

    success: function(phpOutput) {
      if (phpOutput.status.name == "ok") {

        $neighbours = "";

        if (phpOutput['data'].length < 1) {
          $neighbours = "No Neighbours";
        } else {
          phpOutput['data'].forEach(element => {
            $neighbours += element["countryName"];
            $neighbours += ", ";
          });
        }
        
        $('#neighbouringCountriesVal').html($neighbours);

      }

    },

    error: function() {
      alert("Please enter a valid ISO code.");
    }

  });

});


$('#btnSubmitOceanApi').click(function() {

  $.ajax({
    url: "libs/php/getOceanInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      latitude: $("#oceanLatInput").val(),
      longitude: $("#oceanLngInput").val(),
    },

    success: function(phpOutput) {

      if (phpOutput.status.name == "ok") {

        $('#oceanResult').html(phpOutput['data']['name']);
      }

    },

    error: function() {
      alert("Please enter valid latitude and longitude coordinates.")
    }

  });

});