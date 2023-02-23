var baseUrl1 = "http://localhost:8080/app/admin";
var baseUrl2 = "";
var baseUrl3 = "";

function loginUser() {
    var username = $('#userEmail').val();
    var password = $('#userPassword').val();
    var userType = $('#userType').find('option:selected').text();

    console.log(userType);
    console.log(username);
    console.log(password);

    if (userType === "Admin") {
        searchAdmin(userType, username, password);
        generateAdminId();
    } else if (userType === "Customer"){
        searchCustomer(userType, username, password);
    } else if (userType === "Driver"){
        searchDriver(userType,username,password);
    }
}

function searchAdmin(userType, username, password) {
    if (userType === "Admin") {
        $.ajax({
            url: baseUrl1 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                if (res.data === true) {
                    $("#dashBoardContent").css("display", "none");
                    $("#carContent").css("display", "none");
                    $("#loginForm").css("display", "none");
                    $("#aboutContent").css("display", "none");
                    $("#serviceContent").css("display", "none");
                    $("#adminDash").css("display", "block");
                    $("#ManageTableCar").css("display", "none");

                } else {
                    alert(res.message);
                }
            }
        });
    }
}

function searchDriver(userType, username, password) {
    if (userType === "Driver") {
        $.ajax({
            url: baseUrl2 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                if (res.data === true) {
                    location.replace("DriverPage.html");
                } else {

                    alert(res.massage);
                }
            }
        });
    }
}

function searchCustomer(userType, username, password) {
    if (userType === "Customer") {
        $.ajax({
            url: baseUrl3 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                console.log(res.data);
                console.log(res.username);
                console.log(res.password);
                if (res.data === true) {
                    logincar();
                    setTimeout(getLastLoginUser,1500);
                    alert(res.message);
                } else {

                    alert(res.message);
                }
            }
        });
    }
}

$('#loginCheckBtn').click(function () {
    if ($('#userName').val() !== "" && $('#password').val() !== "") {
        loginUser();
    }
});
function logincar() {
    $("#dashBoardContent").css("display", "none");
    $("#loginForm").css("display", "none");
    $("#carContent").css("display", "block");
    $("#signUp").css("display", "none");
    $("#serviceContent").css("display", "none");
    $("#aboutContent").css("display", "none");
    $("#adminDash").css("display", "none");
    $("#ManageTableCar").css("display", "none");
    $("#manageCar").css("display", "none");
    $("#manageUser").css("display", "none");
    $("#manageDriver").css("display", "none");
    $("#paymentDetailsContent").css("display", "none");
    $("#mainteneceContent").css("display", "none");
    $("#reqContent").css("display", "none");
    $("#responsesContent").css("display", "none");
    $("#incomeReportContent").css("display", "none");
    $("#CarBookingContent").css("display", "none");
}