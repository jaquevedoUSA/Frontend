

function leerClientes() {
    $.ajax({
        url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET",
        datatype: "JSON",
        success: function (Clientes) {
            let CS = Clientes.items;
            pintarClientes(CS);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
    });
}

function pintarClientes(CS) {
    $("#ClienteContenido").empty();

    let Table = "<table>";
    Table += "<tr>";
    Table += "<td><b>Nombre</b></td>";
    Table += "<td><b>Detalle</b></td>";
    Table += "</tr>";
    for (i = 0; i < CS.length; i++) {
        Table += "<tr>";
        Table += "<td>" + CS[i].name + "</td>";
        let info = '"' + CS[i].id + "," + CS[i].name + "," + CS[i].email + "," + CS[i].age + '"';
        Table += "<td><button onclick='pintarDetallesClientes(" + info + ")'>Mas info</button></td>";
        Table += "</tr>";
    }
    Table += "</table>";
    console.log(Table);
    $("#ClienteContenido").append(Table);
}

function pintarDetallesClientes(id) {
    $("#ClienteContenido").empty();
    $("#Botones").empty();
    let Info = id.split(",");
    let Table = "<table>";
    Table += "<tr>";
    Table += "<td><b>ID</b></td>";
    Table += "<td><b>NOMBRE</b></td>";
    Table += "<td><b>EMAIL</b></td>";
    Table += "<td><b>EDAD</b></td>";
    Table += "</tr>";
    Table += "<tr>";
    Table += "<td>" + Info[0] + "</td>";
    Table += "<td>" + Info[1] + "</td>";
    Table += "<td>" + Info[2] + "</td>";
    Table += "<td>" + Info[3] + "</td>";
    Table += "</tr>";
    Table += "</table><br>";
    Table += "<button onclick='editarClientes(" + Info[0] + ")'>Editar informacion</button>";
    Table += "<button onclick='borrarClientes(" + Info[0] + ")'>Borrar</button>";
    $("#ClienteContenido").append("<h3>Detalles</h3>" + Table);
}

function guardarClientes() {
    //Declara las variables

    let nombreCliente = $('#ClienteNombre').val();
    let emailCliente = $('#ClienteEmail').val();
    let edadCliente = $('#ClienteEdad').val();

    let data = {
        id: "",
        name: nombreCliente,
        email: emailCliente,
        age: edadCliente
    }

    let dataToSend = JSON.stringify(data);

    if (nombreCliente != "" && emailCliente != "" && nombreCliente != "") {
        $.ajax({
            url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
            type: "POST",
            //datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function (Clientes) {
                $('#ClienteNombre').val("");
                $('#ClienteEmail').val("");
                $('#ClienteEdad').val("");
                leerClientes();
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            },
        });
    }

}

function editarClientes(idCliente) {
    //Declara las variables

    let nombreCliente = $('#ClienteNombre').val();
    let emailCliente = $('#ClienteEmail').val();
    let edadCliente = $('#ClienteEdad').val();

    let data = {
        id: idCliente,
        name: nombreCliente,
        email: emailCliente,
        age: edadCliente
    }

    let dataToSend = JSON.stringify(data);

    if (nombreCliente != "" || emailCliente != "" || nombreCliente != "") {
        $.ajax({
            url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
            type: "PUT",
            //datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function (Clientes) {
                $('#ClienteNombre').val("");
                $('#ClienteEmail').val("");
                $('#ClienteEdad').val("");
                leerClientes();
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            },
        });
    }
    else{
        $("#ClienteContenido").empty();
        $("#ClienteContenido").append("<h3>Detalles</h3><h3>Debes llenar los campos para poder editar</h3>");
        $("#Botones").append("<button onclick='leerClientes()'>Consultar</button><button onclick='guardarClientes()'>Registrar</button>");
    }
}

function borrarClientes(idCliente) {

    let data = {
        id: idCliente,
    }

    let dataToSend = JSON.stringify(data);

    $.ajax({
        url: "https://g3c013c57fa7d92-alquilermotocicletas.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "DELETE",
        //datatype: "JSON",
        data: dataToSend,
        contentType: "application/json",
        success: function (Clientes) {
            $('#ClienteContenido').empty();
            $("#Botones").append("<button onclick='leerClientes()'>Consultar</button><button onclick='guardarClientes()'>Registrar</button>");
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
    });
}