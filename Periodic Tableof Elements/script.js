function toString(a) {
    let str = "[";
    for (let i of a) {
        str += "[";
        for (let j of i) {
            j;
            str += '"' + j + '",';
        }
        str = str.substring(0, str.length - 1) + "],";
    }
    return str.substring(0, str.length - 1) + "]";
}

function getElementCell(element) {
    let atn = parseInt(element[0]);
    if (atn > 57 && atn < 72) {
        return document.getElementById("table").rows[8].cells[atn - 56];
    }
    if (atn > 89 && atn < 104) {
        return document.getElementById("table").rows[9].cells[atn - 88];
    }
    let pos = element[3];
    let comma = pos.indexOf(",");
    let row = parseInt(pos.substring(0, comma));
    let col = parseInt(pos.substring(comma + 1, pos.length));
    return document.getElementById("table").rows[row - 1].cells[col - 1];
}
function getFromRowCol(row, col){
    return document.getElementById("table").rows[row].cells[col-1];
}
for (let element of elements) {
    let cell = getElementCell(element);
    cell.AN = element[0];
    cell.name = element[1];
    cell.sym = element[2];
    if (element[4][0] == "["){
        cell.AM = "["+parseInt(element[4].substring(1,5))+"]";
    } else{
        cell.AM = parseFloat(element[4]).toFixed(3);
    }
        cell.density = element[5];
    cell.MP = element[6];
    cell.BP = element[7];
    cell.date = element[8];
    cell.discoverer = element[9];
    cell.querySelector("h3").innerHTML = cell.sym;
    element.push(cell);
}
indicator(document.getElementById("default"));
function putValues(val) {
    switch (val) {
        case "Name":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].name;
            });
            break;
        case "Atomic Number":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].AN;
            });
            for (let i of colors[0]){
                for(let row of i[0]){
                    getFromRowCol(row, i[1]).style.setProperty("--bcolor", i[2]);
                }
            }
            for (let i of colors[1]){
                for(let row of i[0]){
                    getFromRowCol(i[1], row).style.setProperty("--bcolor", i[2]);
                }
            }
            break;
        case "Atomic Mass":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].AM;
            });
            break;
        case "Density":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].density;
            });
            break;
        case "Melting Point":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].MP+"°C";
            });
            break;
        case "Boiling Point":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].BP+"°C";
            });
            break;
        case "Time of Discovery":
            elements.forEach((element) => {
                element[10].querySelector("p").innerHTML = element[10].date;
            });
            break;
    }
}
