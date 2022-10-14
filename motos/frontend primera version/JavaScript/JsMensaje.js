

function leerMensage() {
    $.ajax({
        url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "GET",
        datatype: "JSON",
        success: function (MENSAJE) {
            let Menssaje = MENSAJE.items;
            pintarMensaje(Menssaje);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
    });
}

function pintarMensaje(Message) {
    $("#MensajeContenido").empty();

    let Table = "<table>";
    Table += "<tr>";
    Table += "<td><b>ID</b></td>";
    Table += "<td><b>MENSAJE</b></td>";
    Table += "<td><b>EDITAR MENSAJE</b></td>";
    Table += "<td><b>ELIMINAR</b></td>";
    Table += "</tr>";
    for (i = 0; i < Message.length; i++) {
        Table += "<tr>";
        Table += "<td>" + Message[i].id + "</td>";
        Table += "<td>" + Message[i].messagetext + "</td>";
        Table += "<td><button onclick='editarMensaje(" + Message[i].id + ")'>Editar Mensaje</button></td>";
        Table += "<td><button onclick='borrarMensaje(" + Message[i].id + ")'>Borrar Mensaje</button></td>";
        Table += "</tr>";
    }
    Table += "</table>";

    $("#MensajeContenido").append(Table);
}


function guardarMensaje() {
    //Declara las variables

    let Texto = $('#TextoMensaje').val();

    let data = {
        id: "",
        messagetext: Texto
    }

    let dataToSend = JSON.stringify(data);

    if (Texto != "") {
        $.ajax({
            url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
            type: "POST",
            //datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function (Clientes) {
                $('#TextoMensaje').val("");
                leerMensage();
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            },
        });
    }

}

function editarMensaje(idMensaje) {
    //Declara las variables

    let Texto = $('#TextoMensaje').val();

    let data = {
        id: idMensaje,
        messagetext: Texto
    }

    let dataToSend = JSON.stringify(data);

    if (Texto != "") {
        $.ajax({
            url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
            type: "PUT",
            //datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function (Clientes) {
                $('#TextoMensaje').val("");
                leerMensage();
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            },
        });
    }
    else {
        $("#MensajeContenido").empty();
        $("#MensajeContenido").append("<h3>Detalles</h3><h3>Debes llenar los campos para poder editar</h3>");
    }
}

function borrarMensaje(idMensaje) {

    let data = {
        id: idMensaje,
    }

    let dataToSend = JSON.stringify(data);

    $.ajax({
        url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "DELETE",
        //datatype: "JSON",
        data: dataToSend,
        contentType: "application/json",
        success: function (Clientes) {
            $('#MensajeContenido').empty();
            leerMensage();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
    });
}