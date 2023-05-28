function exibirTotalItens() {
  var fileInput = document.getElementById('fileInput');
  var files = fileInput.files;
  var totalItems = files.length;

  var totalItemsElement = document.getElementById('totalItems');
  totalItemsElement.textContent = "Total de etiquetas a serem impressas: " + totalItems;
}

function imprimir() {
  var fileInput = document.getElementById('fileInput');
  var files = fileInput.files;
  var zplContents = [];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    reader.onload = function (e) {
      var zplContent = e.target.result;
      zplContents.push(zplContent);

      let totalItems = zplContents.length;
      console.log(totalItems);

      var spanElement = document.getElementById('totalItems');
      spanElement.textContent = totalItems;

      if (zplContents.length === files.length) {
        enviarParaImpressora(zplContents);
      }
    };

    reader.readAsText(file);
  }
}

function enviarParaImpressora(zplContents) {
  var combinedZplContent = '';

  for (var i = 0; i < zplContents.length; i++) {
    combinedZplContent += zplContents[i] + '\n';
  }



  fso = new ActiveXObject("Scripting.FileSystemObject");
  arquivo = fso.CreateTextFile("c:\\boxlabel\\boxlabel.label", true);
  arquivo.WriteLine(combinedZplContent);
  arquivo.Close();

  var oShell = new ActiveXObject("Shell.Application");
  var commandtoRun = "C:\\boxlabel\\boxlabel.bat";
  oShell.ShellExecute(commandtoRun, "", "", "open", "1");

  alert("Reprint realizado com sucesso!");
  location.reload();
}



/*
function enviarParaImpressora(zplContents) {
  var combinedZplContent = zplContents.join('\n'); // Concatenar os elementos do array em uma única string separados por quebra de linha

  fso = new ActiveXObject("Scripting.FileSystemObject");
  arquivo = fso.CreateTextFile("c:\\boxlabel\\boxlabel.label", true);
  arquivo.WriteLine(combinedZplContent);
  arquivo.Close();

  var oShell = new ActiveXObject("Shell.Application");
  var commandtoRun = "C:\\boxlabel\\boxlabel.bat"; 
  oShell.ShellExecute(commandtoRun, "", "", "open", "1");

  alert("Reprint realizado com sucesso!");
  location.reload();
}
*/
