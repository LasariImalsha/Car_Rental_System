$("#changeUserType").click(function () {
    changeType();
});
function changeType(){
    let ty=$("#changeUserType").text();
    if (ty==='User'){
        $("#changeUserType").text('Admin');
        $("#sec2").css('display','none');

    }
    else if (ty==='Admin'){
        $("#changeUserType").text('User');
        $("#sec2").css('display','block');
    }
}
function addAdmin() {
    let id = $('#cusID').val();
    let name = $('#cusName').val();
    let address = $('#cusAddress').val();
    let contactNo = $('#cusContact').val();
    let email = $('#cusEmail').val();
    let username = $('#cusUserName').val();
    let password = $('#password').val();
    if (id) var admin = {
        adminId: id,
        name: name,
        address: address,
        contact: contactNo,
        email: email,
        username: username,
        password: password
    }
    console.log(admin);

    $.ajax({
        url: baseUrl1,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(admin),
        success: function (resp) {
            if (resp.data === true) {
                alert(resp.message);
                clearSignupTextFields();
                if ($("#changeUserType").text()=== 'Admin'){
                    generateAdminId();
                }

            }
        },
        error: function (ob) {

            /*alert(ob.massage);*/
        }
    })
}
function generateAdminId() {
    $.ajax({
        url: baseUrl1 + "/generateAdminID",
        method: "GET",
        success: function (res) {

            $('#cusID').val("");
            $('#cusID').val(res.data);
        }
    });
}