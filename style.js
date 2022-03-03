function init() {
  var btn = document.getElementById("btn");
  var language = document.getElementById("lang");
  var output = document.getElementById("textArea2");
  var input = document.getElementById("textArea1");


  btn.addEventListener("click", function () {

    var data = input.value;

    var language_id = language.value;

    compileCode(data, language_id);

  })

  function compileCode(data, language_id) {
    var data = input.value;

    var language_id = language.value;
    var request = new XMLHttpRequest;
    request.open("POST", "https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var object = {
      "code": data,
      "langId": language_id
    }

    var object = JSON.stringify(object);
    request.send(object);
    setTimeout(function () {

      var response = (JSON.parse(request.responseText))
      console.log(response.codeId)
      if ("error" in response) {
        output.innerText = "code is null";

      }
      else {
        getOutput(response.codeId);
      }

    }, 2000);
  }

  function getOutput(id) {
    var request = new XMLHttpRequest;
    request.open("GET", `https://codequotient.com/api/codeResult/${id}`);
    request.send();
    request.addEventListener("load", function (event) {
      var result = JSON.parse(event.target.responseText);
      let opt = JSON.parse(result.data);
      console.log(opt)
      if (opt.output == "") {
        output.style.fontSize = "15px";
        output.style.color = "red";
        output.innerText = opt.errors;
      }
      else {

        output.style.color = "Green"
        output.style.fontSize = "15px";
        output.innerText = opt.output;
      }

    })
  }
}
init();

