loadAllCustomersTable();
function loadAllCustomersTable() {
    $("#tblUserJson").empty();
    $.ajax({
        url: baseUrl3,
        method: "GET",
        //contentType: "application/json",
        //data: JSON.stringify(driver),
        success: function (resp) {
            console.log(resp.data);
            for (let customer of resp.data) {
                let frontViewPath = customer.nicFrontImg;
                let frontViewImg = frontViewPath.split("D:/intelliJ/Car_Rental_System/FrontEnd/saved_images/customers")[1];
                let FrontViewImgSrc = "saved_images/customers" + frontViewImg;
                console.log(FrontViewImgSrc)
                let row = `<tr > <td>${customer.customerId}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td><td>${customer.email}</td><td>${customer.nicNo}</td><td><img src="${FrontViewImgSrc}" alt="" style="width: 50px; height: 50px;"></td><td><img src="${FrontViewImgSrc}" alt="" style="width: 50px; height: 50px;"></td><td>${customer.licenceNo}</td><td><img src="${FrontViewImgSrc}" alt="" style="width: 50px; height: 50px;"></td><td>${customer.username}</td><td>${customer.password}</td><td>${customer.status}</td></tr>`;
                $("#tblUserJson").append(row);
            }
            //alert(resp.massage);
            // clearSignupTextFields();
        },
        error: function (ob) {
            alert(ob.message);
        }
    });

}