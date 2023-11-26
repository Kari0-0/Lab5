var isValid;
var defaultColor = '#00FF00';
var currentColor = defaultColor;

function checkInput(inputField){
    inputField.setCustomValidity('');
    
    
    if (!inputField.checkValidity()){
    inputField.setCustomValidity('Пoмилка введення');
    isValid = false;
    inputField.classList.add('error');

} else{
    inputField.classList.remove('error');
    isValid = true;
}
}


 function submitForm(){
    var form = document.getElementById('myForm');
    form.reportValidity();
    
    
    if (form.checkValidity()){
        var params =
  "?pib=" +
  encodeURIComponent(document.getElementById("pib").value) +
  "&group=" +
  encodeURIComponent(document.getElementById("group").value) +
  "&phone=" +
  encodeURIComponent(document.getElementById("phone").value) +
  "&faculty=" +
  encodeURIComponent(document.getElementById("faculty").value) +
  "&address=" +
  encodeURIComponent(document.getElementById("address").value);

        
        var newWindow = window.open('FormPage.html' + params,'_blank');
    }
}





document.addEventListener('DOMContentLoaded', function () {
    generateTable();
});

function generateTable() {
    var table = document.getElementById('colorTable');

    for (var i = 0; i < 6; i++) {
        var row = table.insertRow(i);

        for (var j = 0; j < 6; j++) {
            var cell = row.insertCell(j);
            cell.textContent = (i * 6) + j + 1;

            cell.addEventListener('mouseover', function () {
                var cellValue = parseInt(this.textContent);
                if (cellValue == 28 || cellValue % 6 === 4 || cellValue % 6 === 0) {
                    this.style.backgroundColor = getRandomColor();
                }
            });

            cell.addEventListener('click', function () {
                if (this.textContent == 28) {
                    showColorPalette(this);
                }
            });

            cell.addEventListener('dblclick', function () {
                var cellValue = parseInt(this.textContent);
                if (cellValue == 28) {
                    var columnIndex = this.cellIndex;
                    var selectedColor = document.getElementById('html5colorpicker').value;
                    changeColumnColors(columnIndex, selectedColor);
                    changeOtherCellColors(columnIndex, selectedColor);
                }
            });
        }
    }
}

function changeColumnColors(columnIndex, color) {
    var table = document.getElementById('colorTable');

    for (var i = 0; i < 6; i++) {
        var cell = table.rows[i].cells[columnIndex];
        cell.style.backgroundColor = color;
    }
}

function changeOtherCellColors(columnIndex, color) {
    var table = document.getElementById('colorTable');

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            var cell = table.rows[i].cells[j];
            var cellValue = parseInt(cell.textContent);

            if (cellValue == 28 || cellValue % 6 === 4 || cellValue % 6 === 0) {
                cell.style.backgroundColor = color;
            }
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showColorPalette(cell) {
    var colorPicker = document.getElementById('html5colorpicker');
    colorPicker.value = currentColor;

    colorPicker.style.left = cell.offsetLeft + 'px';
    colorPicker.style.top = cell.offsetTop + 'px';
    colorPicker.style.display = 'block';

    colorPicker.addEventListener('change', function () {
        currentColor = colorPicker.value;
        cell.style.backgroundColor = currentColor;
    });
}
