var baseUrl3 = "";

let regName = /^[A-z .]{3,}$/;
let regAddress = /^[A-z ,.0-9]{3,}$/;
let regContactNo = /^(0)[1-9][0-9][0-9]{7}$/;
let regEmail = /^[a-z0-9]{3,}(@)[a-z]{3,}(.)[a-z]{2,3}$/;
let regDrivingLicenceNo = /^(B)[0-9]{7}$/;
let regNicNo = /^[0-9]{9}(V)|[0-9]{12}$/;
let regLoginUsername = /^[A-z0-9]{6,10}$/;
let regLoginPassword = /^[A-z0-9@#$%&!*]{8,}$/;

$('#cusID,#password,#cusName,#cusContact,#cusAddress,#cusEmail,#cusLicence,#cusNic,#imgNiCFront,#imgNiCBack,#imgLicence').on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$('#cusID,#cusName,#cusAddress,#cusContact,#cusEmail,#cusNic,#cusLicence,#password').on('keyup', function (event) {
    if (event.key === "Enter") {
        checkIfSignUpUserFormValid();
    }
});

function checkIfSignUpUserFormValid() {
    var name = $('#cusName').val();
    if (regName.test(name)) {
        $('#cusAddress').focus();
        var address = $('#cusAddress').val();
        if (regAddress.test(address)) {
            $('#cusContact').focus();
            var contactNo = $('#cusContact').val();
            if (regContactNo.test(contactNo)) {
                $('#cusEmail').focus();
                var email = $('#cusEmail').val();
                if (regEmail.test(email)) {
                    //let usertype = $("#cmbType").find('option:selected').text();
                    let usertype = $("#changeUserType").text();
                    if (usertype === "User") {
                        $('#cusNic').focus();
                        var nicNo = $('#cusNic').val();
                        if (regNicNo.test(nicNo)) {
                            $('#cusLicence').focus();
                            var drivingLicence = $('#cusLicence').val();
                            if (regDrivingLicenceNo.test(drivingLicence)) {
                                $('#cusUserName').focus();
                                var username = $('#cusUserName').val();
                                if (regLoginUsername.test(username)) {
                                    $('#password').focus();
                                    var password = $('#password').val();
                                    if (regLoginPassword.test(password)) {
                                        if ($('#imgNiCFront').val() !== "" && $('#imgNiCBack').val() !== "" && $('#imgLicence').val() !== "") {
                                            let res = confirm("Do you want to add this customer?");
                                            if (res) {
                                                addCustomer();
                                            }
                                        } else {
                                            alert("Please fill all fields of customer...")
                                        }
                                    } else {
                                        $('#password').focus();
                                    }
                                } else {
                                    $('#UserName').focus();
                                }
                            } else {
                                $('#cusLicence').focus();
                            }
                        } else {
                            $('#cusNic').focus();
                        }
                    } else if (usertype === "Admin") {
                        $('#cusUserName').focus();
                        username = $('#cusUserName').val();
                        if (regLoginUsername.test(username)) {
                            $('#password').focus();
                            password = $('#password').val();
                            if (regLoginPassword.test(password)) {
                                let res = confirm("Do you want to add this admin?");
                                if (res) {
                                    addAdmin();
                                }
                            } else {
                                $('#password').focus();
                            }
                        } else {
                            $('#cusUserName').focus();
                        }

                    }
                } else {
                    $('#userEmail').focus();
                }
            } else {
                $('#cusContact').focus();
            }
        } else {
            $('#cusAddress').focus();
        }
    } else {
        $('#cusName').focus();
    }
}

function saveCustomer() {

    var cusID = $('#cusID').val();
    var cusName = $('#cusName').val();
    var cusAddress = $('#cusAddress').val();
    var contact = $('#cusContact').val();
    var cusEmail = $('#cusEmail').val();
    var cusNicNo = $('#cusNic').val();
    var licenceNo = $('#cusLicence').val();
    var username = $('#cusUserName').val();
    var password = $('#password').val();

    var customer = {
        customerId: cusID,
        name: cusName,
        address: cusAddress,
        contactNo: contact,
        email: cusEmail,
        nicNo: cusNicNo,
        licenceNo: licenceNo,
        username: username,
        password: password
    }
//console.log(customer);
    $.ajax({
        url: baseUrl3,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function (resp) {
            uploadCustomerImages(cusID);
            clearSignupTextFields();// me deka save wela iwara unaama call karanna
            generateCustomerId();
            alert(resp.message);
        },
        error: function (ob) {

            /*alert(ob.message);*/
        }
    });

}

function clearSignupTextFields() {
    $("#cusName").val('');
    $("#cusAddress").val('');
    $("#cusContact").val('');
    $("#cusNic").val('');
    $("#cusUserName").val('');
    $("#password").val('');
    $("#cusEmail").val('');
    $("#imgNiCFront").val('');
    $("#imgNiCBack").val('');
    $("#imgLicence").val('');

}

function uploadCustomerImages(id) {
    var fileObjectNic1 = $('#imgNiCFront')[0].files[0];
    var fileNameNic1 = id + "-nicfront-" + ($('#imgNiCFront')[0].files[0].name);

    var fileObjectNic2 = $('#imgNiCBack')[0].files[0];
    var fileNameNic2 = id + "-nicback-" + $('#imgNiCBack')[0].files[0].name;

    var fileObjectLicence = $('#imgLicence')[0].files[0];
    var fileNameLicence = id + "-licence-" + $('#imgLicence')[0].files[0].name;

    var data1 = new FormData();
    data1.append("nicf", fileObjectNic1, fileNameNic1);
    data1.append("nicb", fileObjectNic2, fileNameNic2);
    data1.append("licenceImg", fileObjectLicence, fileNameLicence);
    console.log(data1);
    $.ajax({
        url: baseUrl3 + "/up/" + id,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data1,
        success: function (res) {
            console.log("Uploaded");
            clearSignupTextFields();
        },
        error:function (res){
            alert(res.message);
        }
    })




}

generateCustomerId();

function generateCustomerId() {
    $.ajax({
        url: baseUrl3 + "/generateCustomerId", method: "GET", success: function (res) {
            $('#cusID').val(res.data);
        }
    })
}

//check validate on keyUp
$('#cusName').on('keyup', function () {
    var name = $('#cusName').val();
    if (regName.test(name)) {
        $("#cusName").css('border', '2px solid green');
        return true;
    } else {
        $("#cusName").css('border', '2px solid red');
        return false;
    }
})

$('#cusAddress').on('keyup', function () {
    var address = $('#cusAddress').val();
    if (regAddress.test(address)) {
        $("#cusAddress").css('border', '2px solid green');
        return true;
    } else {
        $("#cusAddress").css('border', '2px solid red');
        return false;
    }
})

$('#cusContact').on('keyup', function () {
    var contactNo = $('#cusContact').val();
    if (regContactNo.test(contactNo)) {
        $("#cusContact").css('border', '2px solid green');
        return true;
    } else {
        $("#cusContact").css('border', '2px solid red');
        return false;
    }
})

$('#cusEmail').on('keyup', function () {
    var email = $('#cusEmail').val();
    if (regEmail.test(email)) {
        $("#cusEmail").css('border', '2px solid green');
        return true;
    } else {
        $("#cusEmail").css('border', '2px solid red');
        return false;
    }
})

$('#cusLicence').on('keyup', function () {
    var drivingLicence = $('#cusLicence').val();
    if (regDrivingLicenceNo.test(drivingLicence)) {
        $("#cusLicence").css('border', '2px solid green');
        return true;
    } else {
        $("#cusLicence").css('border', '2px solid red');
        return false;
    }
})

$('#cusNic').on('keyup', function () {
    var nicNo = $('#cusNic').val();
    if (regNicNo.test(nicNo)) {
        $("#cusNic").css('border', '2px solid green');
        return true;
    } else {
        $("#cusNic").css('border', '2px solid red');
        return false;
    }
})

$('#cusUserName').on('keyup', function () {
    var userName = $('#cusUserName').val();
    if (regLoginUsername.test(userName)) {
        $("#cusUserName").css('border', '2px solid green');
        return true;
    } else {
        $("#cusUserName").css('border', '2px solid red');
        return false;
    }
})

$('#password').on('keyup', function () {
    var password = $('#password').val();
    if (regLoginPassword.test(password)) {
        $("#password").css('border', '2px solid green');
        return true;
    } else {
        $("#password").css('border', '2px solid red');
        return false;
    }
})

/*-----------------------------------------------------------*/
/*Register Button*/
var usertype=$("#changeUserType").text();
$("#registerBtn").click(function () {


    if ($("#changeUserType").text() === 'User') {

        if ($('#cusName').val() !== "" ) {
            if ($('#cusName').val() !== "" && $('#cusContact').val() !== "" && $('#cusAddress').val() !== "" && $('#cusEmail').val() !== "" && $('#cusNic').val() !== "" && $('#cusLicence').val() !== "" && $('#cusUserName').val() !== "" && $('#password').val() !== "" && $('#imgNiCFront').val() !== "" && $('#imgNiCBack').val() !== "" && $('#imgLicence').val() !== "") {
                saveCustomer();
                // clearSignupTextFields();// me deka save wela iwara unaama call karanna
                // generateCustomerId();
            }
            /*if ($('#cusContact').val() !== "") {
                if ($('#cusAddress').val() !== "") {
                    if ($('#cusEmail').val() !== "") {
                        if ($('#cusEmail').val() !== "") {
                            if ($('#cusNic').val() !== "") {
                                if ($('#cusUserName').val() !== "") {
                                    if ($('#password').val() !== "") {
                                        if ($('#imgNiCFront').val() !== "") {
                                            if ($('#imgNiCBack').val() !== "") {
                                                if ($('#imgLicence').val() !== "") {
                                                    let res = confirm("Do you want to add this customer?");
                                                    if (res) {


                                                    }
                                                } else {
                                                    alert("Please upload image of licence");
                                                    $('#imgLicence').focus();
                                                }
                                            } else {
                                                alert("Please upload back image of NIC");
                                                $('#imgNiCBack').focus();
                                            }
                                        } else {
                                            alert("Please upload front image of NIC");
                                            $('#imgNiCFront').focus();
                                        }
                                    } else {
                                        alert("Please enter password...");
                                        $('#password').focus();
                                    }
                                } else {
                                    alert("Please enter username...");
                                    $('#cusUserName').focus();
                                }
                            } else {
                                alert("Please enter your NIC No...");
                                $('#cusNic').focus();
                            }
                        } else {
                            alert("Please enter your licence No...");
                            $('#cusLicence').focus();
                        }
                    } else {
                        alert("Please enter your email...");
                        $('#cusEmail').focus();
                    }
                } else {
                    alert("Please enter your address...");
                    $('#cusAddress').focus();
                }
            } else {
                alert("Please enter your Contact No...");
                $('#cusContact').focus();
            }*/
        } else {
            alert("Please select user type");
            $('#cusName').focus();
        }
    }

    else if ($("#changeUserType").text() === 'Admin') {
        if ($('#cusName').val() !== "") {
            if ($('#cusAddress').val() !== "") {
                if ($('#cusContact').val() !== "") {
                    if ($('#cusEmail').val() !== "") {
                        if ($('#cusUserName').val() !== "") {
                            if ($('#password').val() !== "") {
                                let res = confirm("Do you want to add this admin?");
                                if (res) {
                                    if ($('#cusName').val() !== "" && ('#cusContact').val() !== "" && $('#cusContact').val() !== "" && $('#cusAddress').val() !== "" && $('#cusEmail').val() !== "" && $('#cusUserName').val() !== "" && $('#password').val() !== "" && $('#imgNiCFront').val() !== "") {
                                        addAdmin();
                                        clearSignupTextFields();
                                    }

                                }
                            } else {
                                alert("Please enter password...");
                                $('#password').focus();
                            }
                        } else {
                            alert("Please enter username...");
                            $('#cusUserName').focus();
                        }
                    } else {
                        alert("Please enter your email...");
                        $('#cusEmail').focus();
                    }
                } else {
                    alert("Please enter your Contact No...");
                    $('#cusContact').focus();
                }
            } else {
                alert("Please enter your address...");
                $('#cusAddress').focus();
            }
        } else {
            alert("Please enter your name...");
            $('#cusName').focus();
        }
    }
    else {
        alert("Please select user type");
    }
});