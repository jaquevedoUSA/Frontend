/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function pedirMotos() {

    console.log("entro");
    $.ajax({
        url: "http://localhost:8080/api/Motorbike/all",
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (Motos) {

            pintarMotos(Motos);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });


}

function pintarMotos(Motos) {

    $("#tablaBody").remove()();

    let Table = '<tbody id="tablaBody">';

    for (i = 0; i < Motos.length; i++) {
        Table += "<tr>";
        Table += "<td>" + Motos[i].name + "</td>";
        Table += "<td>" + Motos[i].brand + "</td>";
        Table += "<td>" + Motos[i].year + "</td>";
        Table += "<td>" + Motos[i].category.description + "</td>";
        Table += "<td><button onclick='reservarMoto(" + Motos[i].id + ")'>Reservar</button></td>";
        Table += "</tr>";
    }
    Table += "</tbody>";
    $("#ClienteContenido").append(Table);

}
