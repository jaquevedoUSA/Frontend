/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function pedirMotos() {

    console.log("entro");
    $.ajax({
        url: "http://168.138.135.252:8080/api/Motorbike/all",
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (Motos) {

            pintarMotos(Motos);
            $("#btnCargar").remove();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });


}

function pintarMotos(Motos) {

    $("#tablaBody").empty();

    let Table;
    var process;

    for (i = 0; i < Motos.length; i++) {
        
        process = true;
        
        for (var j = 0; j < Motos[i].reservations.length; j++) {
            console.log(Motos[i].reservations[j].status);
            if (Motos[i].reservations[j].status === "En proceso"){
                process = false;
                break;
            }
        }
        
        if (process) {
            Table += "<tr>";
            Table += "<td>" + Motos[i].name + "</td>";
            Table += "<td>" + Motos[i].brand + "</td>";
            Table += "<td>" + Motos[i].year + "</td>";
            Table += "<td>" + Motos[i].description + "</td>";
            Table += "<td>" + Motos[i].category.name + "</td>";
            Table += "<td><a href='clienteReserva.html' class='btn btn-outline-success' type='button' onclick='guardarIdMoto(" + Motos[i].id + ")'>Reservar</a></td>";
            Table += "</tr>";
        }

    }

    $("#tablaBody").append(Table);

}


function guardarIdMoto(id) {
    localStorage.setItem("idMoto", id);
}