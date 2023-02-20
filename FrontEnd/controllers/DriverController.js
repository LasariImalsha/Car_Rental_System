var baseUrl2 = "";

driverLoadTable();
function addDriver() {
    let id = $('#driverLicenceNo').val();
    let name = $('#name').val();
    let address = $('#address').val();
    let contactNo = $('#contactNo').val();

    let nicNo = $('#nicNo').val();
    let username = $('#driverUserName').val();
    let password = $('#driverPassword').val();
    /*let password = $('#availability').val();*/

    if (id) var driver = {
        licenceNo: id,
        name: name,
        address: address,
        contactNo: contactNo,
        nicNo: nicNo,
        username: username,
        password: password
    }

    $.ajax({

        url: baseUrl2,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (resp) {
            if (resp.data === true) {

                //alert(resp.massage);
                console.log(resp);
                driverLoadTable();
                // clearSignupTextFields();
            }
        },
        error: function (ob) {
            /*alert(ob.massage);*/
        }
    });
}

function driverLoadTable() {
    $("#tblDriverJson").empty();
    $.ajax({
        url: baseUrl2,
        method: "GET",
        //contentType: "application/json",
        //data: JSON.stringify(driver),
        success: function (resp) {
            console.log(resp.data);
            for (let driver of resp.data) {
                let row = `<tr><td>${driver.licenceNo}</td><td>${driver.name}</td><td>${driver.address}</td><td>${driver.contactNo}</td><td>${driver.nicNo}</td><td>${driver.username}</td><td>${driver.password}</td><td>${driver.availability}</td></tr>`;
                $("#tblDriverJson").append(row);
            }
            bindClickEvents();
            //alert(resp.massage);
            // clearSignupTextFields();
        },
        error: function (ob) {
            /*alert(ob.massage);*/
        }
    });

}


//update Driver
function updateDriver() {
    let id = $('#driverLicenceNo').val();
    let name = $('#name').val();
    let address = $('#address').val();
    let contactNo = $('#contactNo').val();

    let nicNo = $('#nicNo').val();
    let username = $('#driverUserName').val();
    let password = $('#driverPassword').val();
    //creating a js object with relevant data which you want to send to the server
    var cusOb = {
        licenceNo: id,
        name: name,
        address: address,
        contactNo: contactNo,
        nicNo: nicNo,
        username: username,
        password: password
    }

    $.ajax({
        url: baseUrl2,
        method: "PUT",
        contentType: "application/json", //You should state request's content type using MIME types
        data: JSON.stringify(cusOb), // format js object to valid json string
        success: function (res) {
            if (res.code === 200) { // process is  ok
                alert("Successfully Updated");
                driverLoadTable();
                clearForm();
            }
        },
        error: function (ob) {
            //alert(ob.responseJSON.message);
        }
    });
}
//Delete Driver
function deleteDriver() {
    // Get the Driver id
    let LId = $("#driverLicenceNo").val();

    // initiate the request
    $.ajax({
        url: baseUrl2 + "?licenceNo=" + LId,// viya query string
        method: "DELETE",
        //data:data,// application/x-www-form-urlencoded
        success: function (res) {
            if (res.code === 200) {
                alert("driver Successfully Deleted");
                driverLoadTable();
                clearForm();
            }
        },
        error: function (ob) {
            alert("driver Deleted Unsuccessfully");
        }
    });
}
//Search driver Event
$("#driverLicenceNo").on("keypress", function (e) {
    if (e.key === "Enter") {
        searchDriver();
    }
});

//Search Driver
function searchDriver() {
    let LId = $("#driverLicenceNo").val();
    $.ajax({
        url: baseUrl2 + "/" + LId,
        method: "GET",
        success: function (res) {
            if (res.code === 200) {
                var driver = res.data;
                $("#driverLicenceNo").val(driver.id);
                $("#name").val(driver.name);
                $("#address").val(driver.address);
                $("#contactNo").val(driver.contactNo);
                $("#nicNo").val(driver.nicNo);
                $("#driverUserName").val(driver.username);
                $("#driverPassword").val(driver.password);
            } else {
                clearForm();
            }
        },
        error:function (ob){
            alert(ob.responseJSON.message);
        }
    });
}


//Bind click events to the table rows
function bindClickEvents() {
    $("#tblDriverJson>tr").click(function () {
        //Get values from the selected row
        let lId = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contactNo = $(this).children().eq(3).text();
        let nicNo = $(this).children().eq(4).text();
        let userName= $(this).children().eq(5).text();
        let password = $(this).children().eq(6).text();


        //Set values to the text-fields
        $("#driverLicenceNo").val(lId);
        $("#name").val(name);
        $("#address").val(address);
        $("#contactNo").val(contactNo);
        $("#nicNo").val(nicNo);
        $("#driverUserName").val(userName);
        $("#driverPassword").val(password);
    });
}
//Clear text feild
function clearForm() {
    $("#driverLicenceNo").val("");
    $("#name").val("");
    $("#address").val("");
    $("#contactNo").val("");
    $("#nicNo").val("");
    $("#driverUserName").val("");
    $("#driverPassword").val("");
    $("#driverLicenceNo").focus();
}
let regNameD = /^[A-z .]{3,}$/;
let regAddressD = /^[A-z ,.0-9]{3,}$/;
let regContactNoD = /^(0)[1-9][0-9][0-9]{7}$/;
let regDrivingLicenceNoD = /^(B)[0-9]{7}$/;
let regNicNoD = /^[0-9]{9}(V)|[0-9]{12}$/;
let regLoginUsernameD = /^[A-z0-9]{6,10}$/;
let regLoginPasswordD = /^[A-z0-9@#$%&!*]{8,}$/;


//Driver Manage Validate
$('#driverLicenceNo').on('keyup', function () {
    var driverLicenceNo = $('#driverLicenceNo').val();
    if (regDrivingLicenceNoD.test(driverLicenceNo)) {
        $("#driverLicenceNo").css('border', '2px solid green');
        return true;
    } else {
        $("#driverLicenceNo").css('border', '2px solid red');
        return false;
    }
});

$('#name').on('keyup', function () {
    var name = $('#name').val();
    if (regNameD.test(name)) {
        $("#name").css('border', '2px solid green');
        return true;
    } else {
        $("#name").css('border', '2px solid red');
        return false;
    }
});

$('#address').on('keyup', function () {
    var address = $('#address').val();
    if (regAddressD.test(address)) {
        $("#address").css('border', '2px solid green');
        return true;
    } else {
        $("#address").css('border', '2px solid red');
        return false;
    }
});

$('#contactNo').on('keyup', function () {
    var contactNo = $('#contactNo').val();
    if (regContactNoD.test(contactNo)) {
        $("#contactNo").css('border', '2px solid green');
        return true;
    } else {
        $("#contactNo").css('border', '2px solid red');
        return false;
    }
});

$('#nicNo').on('keyup', function () {
    var nicNo = $('#nicNo').val();
    if (regNicNoD.test( nicNo)) {
        $("#nicNo").css('border', '2px solid green');
        return true;
    } else {
        $("#nicNo").css('border', '2px solid red');
        return false;
    }
});

$('#driverUserName').on('keyup', function () {
    var driverUserName = $('#driverUserName').val();
    if (regLoginUsernameD.test( driverUserName)) {
        $("#driverUserName").css('border', '2px solid green');
        return true;
    } else {
        $("#driverUserName").css('border', '2px solid red');
        return false;
    }
});

$('#driverPassword').on('keyup', function () {
    var driverPassword = $('#nicNo').val();
    if (regLoginPasswordD.test( driverPassword)) {
        $("#driverPassword").css('border', '2px solid green');
        return true;
    } else {
        $("#driverPassword").css('border', '2px solid red');
        return false;
    }
});


