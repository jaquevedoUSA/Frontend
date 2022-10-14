/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function ocultarAlertaEmail(){
    $("#emailHelp").remove();
}

function ocultarAlertaPass(){
    $("#passHelp").remove();
}

function guardarClientes() {
    //Declara las variables

    let nombreCliente = $('#nombre').val();
    let emailCliente = $('#email').val();
    let cemailCliente = $('#cemail').val();
    let edadCliente = $('#edad').val();
    let passCliente = $('#pass').val();
    let cpassCliente = $('#cpass').val();

    let estado;

    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (Clientes) {
            //let clienteItem = Clientes.items;
            estado = true;
            //console.log(clienteItem);

            if (Clientes.length !== 0) {
                for (i = 0; i < Clientes.length; i++) {
                    if (Clientes[i].email === emailCliente) {
                        estado = false;
                        console.log(Clientes[i].email);
                        break;
                    }
                }
            } else {
                estado = true;
            }

            if (estado) {
                if (emailCliente === cemailCliente) {
                    if (passCliente === cpassCliente) {
                        registrarCliente(nombreCliente, emailCliente, passCliente, edadCliente);
                    } else {
                        $('#pass').val("");
                        $('#cpass').val("");
                        let alerta;
                        alerta = '<div id="passHelp" class="form-text text-danger">La contraseña no coincide</div>';
                        $("#confirmpassw").append(alerta);
                    }
                } else {
                    $('#cemail').val("");
                    let alerta;
                    alerta = '<div id="emailHelp" class="form-text text-danger">El correo electronico no coincide</div>';
                    $("#confirmemail").append(alerta);
                }
            } else {
                $("#formulario").empty();
                let alerta;
                alerta = '<div class="alert alert-danger w-50 mx-auto" role="alert">';
                alerta += '<h4 class="alert-heading">UPS! Tenemos un problema</h4>';
                alerta += '<p>El correo registrado ya se encuentra en nuestra base de datos.</p>';
                alerta += '</div>';
                $("#formulario").append(alerta);
            }
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });


}


function registrarCliente(nombreCliente, emailCliente, passwordCliente, edadCliente) {

    let data = {
        idClient: "",
        password: passwordCliente,
        name: nombreCliente,
        email: emailCliente,
        age: edadCliente
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

    if (nombreCliente !== "" && emailCliente !== "" && nombreCliente !== "") {
        $.ajax({
            url: "http://localhost:8080/api/Client/save",
            type: "POST",
            datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function (Clientes) {
                $("#formulario").empty();
                let alerta;
                alerta = '<div class="alert alert-success w-50 mx-auto" role="alert">';
                alerta += '<h4 class="alert-heading">Registro exitoso</h4>';
                alerta += '<p>El usuario ha sido registrado en nuestra base de datos.</p>';
                alerta += '</div>';
                $("#formulario").append(alerta);
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            }
        });
    }
}

