function exibirTotalItens() {
  var fileInput = document.getElementById('fileInput');
  var files = fileInput.files;
  var totalItems = files.length;

  var totalItemsElement = document.getElementById('totalItems');
  totalItemsElement.textContent = "Total de etiquetas a serem impressas: " + totalItems;
}

function removeHeaderFooter(zpl) {
  var startIndex = zpl.indexOf('^XA');
  var endIndex = zpl.lastIndexOf('^XZ');

  if (startIndex !== -1 && endIndex !== -1) {
    return zpl.substring(startIndex, endIndex + 3);
  } else {
    return zpl;
  }
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
      var cleanZplContent = removeHeaderFooter(zplContent);
      zplContents.push(cleanZplContent);

      let totalItems = zplContents.length;
      console.log(totalItems);

      var spanElement = document.getElementById('totalItems');
      spanElement.textContent = "Total de etiquetas a serem impressas: " + totalItems;

      if (zplContents.length === files.length) {
        enviarParaImpressora(zplContents);
      }
    };

    reader.readAsText(file);
  }
}


function compactarZPL(zplContent) {
  var compressedData = pako.deflate(zplContent, { level: 9 });
  var base64Data = btoa(String.fromCharCode.apply(null, compressedData));

  return base64Data;
}

function enviarParaImpressora(zplContents) {
  var combinedZplContent = zplContents.join('');


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

  alert("Impressões enviadas com sucesso!");
  location.reload();
}
