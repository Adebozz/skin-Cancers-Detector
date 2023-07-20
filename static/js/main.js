$(document).ready(function () {
  // Init
  $(".image-section").hide();
  $(".loader").hide();
  $("#result").hide();
  $("#result-info").hide();

  //   $("#melanoma").hide();
  //   $("#basal").hide();
  //   $("#squamous").hide();

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#imageUpload").change(function () {
    $(".image-section").show();
    $("#btn-predict").show();
    $("#result").text("");
    $("#result").hide();
    $("#result-info").hide();
    readURL(this);
  });

  // Predict
  $("#btn-predict").click(function () {
    var form_data = new FormData($("#upload-file")[0]);

    // Show loading animation
    $(this).hide();
    $(".loader").show();

    // Make prediction by calling api /predict
    $.ajax({
      type: "POST",
      url: "/predict",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        $(".loader").hide();
        $("#result").fadeIn(600);
        $("#result").text("The predicted class is " + data);
        if (data === "melanoma") {
          $("#result-info").show();
          $("#squamous").hide();
          $("#basal").hide();
          $("#pbk").hide();
          $("#vas").hide();
          $("#ak").hide();
          $("#nevi").hide();
        } else if (data === "squamous cell carcinoma") {
          $("#result-info").show();
          $("#melanoma").hide();
          $("#basal").hide();
          $("#pbk").hide();
          $("#vas").hide();
          $("#ak").hide();
          $("#nevi").hide();
        } else if (data === "basal cell carcinoma") {
          $("#result-info").show();
          $("#melanoma").hide();
          $("#squamous").hide();
          $("#pbk").hide();
          $("#vas").hide();
          $("#ak").hide();
          $("#nevi").hide();
        } else if (data === "actinic keratosis") {
          $("#result-info").show();
          $("#melanoma").hide();
          $("#basal").hide();
          $("#pbk").hide();
          $("#vas").hide();
          $("#squamous").hide();
          $("#nevi").hide();
        } else if (data === "nevus") {
          $("#result-info").show();
          $("#melanoma").hide();
          $("#squamous").hide();
          $("#pbk").hide();
          $("#vas").hide();
          $("#ak").hide();
          $("#basal").hide();
        } else if (data === "pigmented benign keratosis") {
          $("#result-info").show();
          $("#melanoma").hide();
          $("#basal").hide();
          $("#squamous").hide();
          $("#vas").hide();
          $("#ak").hide();
          $("#nevi").hide();
        } else if (data === "vascular lesion") {
          $("#result-info").show();
          $("#melanoma").hide();
          $("#squamous").hide();
          $("#pbk").hide();
          $("#basal").hide();
          $("#ak").hide();
          $("#nevi").hide();
        }

        console.log("Success!");
      },
    });
  });
});
