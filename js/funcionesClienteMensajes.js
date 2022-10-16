/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let idMoto;

$.ajax({
    url: "http://168.138.135.252:8080/api/Motorbike/all", //localStorage.getItem("idMoto"),
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



function pintarMotos(Motos) {

    $("#selectorMotos").empty();

    let Table;
    Table += '<option selected>Selecciona una categoria</option>';

    for (i = 0; i < Motos.length; i++) {

        Table += '<option value=' + Motos[i].id + '>' + Motos[i].name + '</option>';
    }

    $("#selectorMotos").append(Table);
}


function cargarMensajes() {

    idMoto = $("#selectorMotos").val();
    console.log(idMoto);

    $.ajax({
        url: "http://168.138.135.252:8080/api/Message/all", //localStorage.getItem("idMoto"),
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (Mensajes) {

            $("#tablaBody").empty();

            let Table;

            for (i = 0; i < Mensajes.length; i++) {

                if (Mensajes[i].motorbike.id.toString() === idMoto) {
                    Table += "<tr>";
                    Table += "<td>" + Mensajes[i].client.name + "</td>";
                    Table += "<td>" + Mensajes[i].messageText + "</td>";
                    Table += "</tr>";
                }

            }

            $("#tablaBody").append(Table);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });
}


function  enviarMensaje() {


    let data = {
        idMessage: "",
        messageText: $("#textoD").val(),
        motorbike: {id: idMoto},
        client: {idClient: 1}
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

    $.ajax({
        url: "http://168.138.135.252:8080/api/Message/save",
        type: "POST",
        datatype: "JSON",
        data: dataToSend,
        contentType: "application/json",
        success: function () {
            alert('Mensaje publicado con exito');
            cargarMensajes();
            $("#textoD").val("");
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    }
    );
}