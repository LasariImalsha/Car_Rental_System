var baseUrl4 = "http://localhost:8080/app/car";

$("#addCar").click(function () {
    addCar();
});

function addCar() {
    var carID = $('#carRegisterId').val();
    var carBrand = $('#carBrand').val();
    var carType = $('#carType').val();
    var carPassengers = $('#carPassengers').val();
    var carTransmissionType = $('#carTransmissionType').val();
    var carFuelType = $('#fuelType').val();
    var carColor = $('#carColor').val();
    var carDailyRate = $('#dailyRate').val();
    var carMotnhlyRate = $('#monthlyRate').val();
    var carMileagePrice = $('#mileagePrice').val();
    var carMileageDuration = $('#mileageDuration').val();
    var carLossDamageWaiver = $('#lossDamageWaiver').val();
    var carPriceOfExtraKM = $('#priceOfExtraKM').val();
    var carCompleteKm = $('#completeKm').val();

    var car = {
        registrationNO: carID,
        brand: carBrand,
        type: carType,
        noOfPassengers: carPassengers,
        transmissionType: carTransmissionType,
        fuelType: carFuelType,
        color: carColor,
        dailyRate: carDailyRate,
        monthlyRate: carMotnhlyRate,
        freeKmForPrice: carMileagePrice,
        freeKmForDuration: carMileageDuration,
        lossDamageWaiver: carLossDamageWaiver,
        priceForExtraKm: carPriceOfExtraKM,
        completeKm: carCompleteKm,
    }
    console.log(car);
    $.ajax({
        url: baseUrl4,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(car),
        success: function (resp) {
            uploadCarImages(carID);
            //loadAllCarsTable();
            alert(resp.message);
        },
        error: function (ob) {

            alert(ob.message);
        }
    });
}

function uploadCarImages(id) {
    var fileObjectCar1 = $('#frontViewIm')[0].files[0];
    var fileNameCar1 = id + "-carfront-" + $('#frontViewIm')[0].files[0].name;

    var fileObjectCar2 = $('#backViewIm')[0].files[0];
    var fileNameCar2 = id + "-carback-" + $('#backViewIm')[0].files[0].name;

    var fileObjectCar3 = $('#internalViewIm')[0].files[0];
    var fileNameCar3 = id + "-carInterImg-" + $('#internalViewIm')[0].files[0].name;

    var fileObjectCar4 = $('#sideViewIm')[0].files[0];
    var fileNameCar4 = id + "-carSideImg-" + $('#sideViewIm')[0].files[0].name;

    var data = new FormData();
    data.append("frontImg", fileObjectCar1, fileNameCar1);
    data.append("backImg", fileObjectCar2, fileNameCar2);
    data.append("interImg", fileObjectCar3, fileNameCar3);
    data.append("sideImg", fileObjectCar4, fileNameCar4);

    $.ajax({
        url: baseUrl4 + "/up/" + id,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log("Uploaded");
            clearSignupTextFields();
        }
    })
}

loadAllCarsTable();

function loadAllCarsTable() {
    $("#tblCarJson").empty();
    $.ajax({
        url: baseUrl4, method: "GET", //contentType: "application/json",
        //data: JSON.stringify(driver),
        success: function (resp) {
            console.log(resp.data);

            for (let car of resp.data) {
                let frontViewPath = car.frontViewImg;
                let frontViewImg = frontViewPath.split("")[1];
                let FrontViewImgSrc = "saved_images/cars" + frontViewImg;

                let sideViewPath = car.sideViewImg;
                let sideViewImg = sideViewPath.split("")[1];
                let sideViewImgSrc = "saved_images/cars" + sideViewImg;

                let interiorViewPath = car.internalViewImg;
                let interiorViewImg = interiorViewPath.split("")[1];
                let interiorViewImgSrc = "saved_images/cars" + interiorViewImg;

                let backViewPath = car.backViewImg;
                let backViewImg = backViewPath.split("")[1];
                let backViewImgSrc = "saved_images/cars" + backViewImg;

                let row = `<tr> <td class="col-3">
                    <div class="carousel slide carousel-fade " data-bs-ride="carousel" id="carouselExampleFade">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img alt="..." class="d-block w-100 carImg" src=${FrontViewImgSrc}>
                            </div>
                            <div class="carousel-item">
                                <img alt="..." class="d-block w-100 carImg"
                                     src=${sideViewImgSrc}>
                            </div>
                            <div class="carousel-item">
                                <img alt="..." class="d-block w-100 carImg"
                                     src=${interiorViewImgSrc}>
                            </div>
                            <div class="carousel-item">
                                <img alt="..." class="d-block w-100 carImg" src=${backViewImgSrc}>
                            </div>
                        </div>
                        <button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleFade"
                                type="button">
                            <span aria-hidden="true" class="carousel-control-prev-icon"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleFade"
                                type="button">
                            <span aria-hidden="true" class="carousel-control-next-icon"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </td>
                <td class="col-3">
                    <div class="card-body">
                        <h5 class="card-title">${car.brand} </h5>
                        <br>
                      
                      
                    </div>
                </td>
                 <td class="col-3">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">No of Passengers : <b>${car.noOfPassengers}</b></li>
                        <li class="list-group-item">Transmission Type : <b>${car.transmissionType}</b></li>
                        <li class="list-group-item">Fuel Type : <b> ${car.fuelType}</b></li>
                        <li class="list-group-item">Color : <b> ${car.color}</b></li>
                        <li class="list-group-item">Free Duration : <b> ${car.freeKmForDuration} KM</b></li>
                        <li class="list-group-item">Extra 1Km charge : <b> ${car.freeKmForPrice} LKR</b></li>
                    </ul>
                </td>
                 <td class="col-2">
                    <ul>
                        <li class="list-group-item"><b>${car.dailyRate} LKR/per day</b></li>
                        <br>
                        <li class="list-group-item"><b>${car.monthlyRate} LKR/per month</b></li>
                    </ul>
                </td>
                 <td class="col-1">
                    <button class="rentCarBtn" type="button">Rent Car</button>
                </td>
                </tr>`;
                $("#tblCarJson").append(row);


            }bookingFormOpen();
        }
    });

}
loadDataCarManageTable();
function loadDataCarManageTable() {
    $("#tblCarManageJson").empty();
    $.ajax({
        url: baseUrl4,
        method: "GET",
        //contentType: "application/json",
        //data: JSON.stringify(driver),
        success: function (resp) {
            console.log(resp.data);
            for (let car of resp.data) {
                let row = `<tr> <td>${car.registrationNO}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.noOfPassengers}</td><td>${car.transmissionType}</td><td>${car.fuelType}</td><td>${car.dailyRate}</td><td>${car.monthlyRate}</td><td>${car.freeKmForPrice}</td><td>${car.freeKmForDuration}</td><td>${car.lossDamageWaiver}</td><td>${car.priceForExtraKm}</td><td>${car.completeKm}</td><td>${car.status}</td></tr>`;
                $("#tblCarManageJson").append(row);
                setCarDataToFields();
            }
        }
    });
}
function bookingFormOpen(){
    $(".rentCarBtn").click(function (){
        rentBokking();
    });

}

function setCarDataToFields() {
    $("#tblCarManageJson>tr").click(function () {

        $.ajax({
            url: baseUrl4 + "/" +$(this).children().eq(0).text(),
            method: "GET",
            success: function (res) {
                if (res.code === 200) {
                    var car = res.data;
                    $('#carRegisterId').val(car.registrationNO);
                    $('#carBrand').val(car.brand);
                    $('#carType').val(car.type);
                    $('#carColor').val(car.color);
                    $('#fuelType').val(car.fuelType);
                    $('#carTransmissionType').val(car.transmissionType);
                    $('#carPassengers').val(car.noOfPassengers);
                    $('#dailyRate').val(car.dailyRate);
                    $('#monthlyRate').val(car.monthlyRate);
                    $('#mileagePrice').val(car.freeKmForPrice);
                    $('#mileageDuration').val(car.freeKmForDuration);
                    $('#lossDamageWaiver').val(car.lossDamageWaiver);
                    $('#priceOfExtraKM').val(car.priceForExtraKm);
                    $('#completeKm').val(car.completeKm);

                }

                alert("Data Fix in Fields");

            }
        });
    });


}

