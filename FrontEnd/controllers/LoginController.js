var baseUrl1 = "http://localhost:8080/app/admin";
var baseUrl2 = "http://localhost:8080/app/customer";
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
                    location.replace("pages/Admin.html");
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
            url: baseUrl3 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                if (res.data === true) {
                    location.replace("pages/DriverPage.html");
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
            url: baseUrl2 + "/" + username + "/" + password,
            method: "GET",
            success: function (res) {
                console.log(res.data);
                console.log(res.username);
                console.log(res.password);
                if (res.data === true) {
                    location.replace("pages/Customer.html");
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

