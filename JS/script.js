dbUsers = [{username:"aaa", password: "111"}, {username:"bbb", password: "222"}];

var a = document.getElementById("txtUsername");
var b = document.getElementById("txtUserpass");
var buttonClick = document.getElementById("btnClick");

buttonClick.addEventListener("click", function() {

    // for each key-value pair in database, compare and decide;
    dbUsers.forEach(element => {
        console.log("element: " , element);
        console.log("[0], [1]: ", element[0], element[1]);
        console.log("username: ", a.value);
        console.log("password: ", b.value);

        if (a.value == element.username && b.value == element.password) {
            //window.location.href = "UserDashboard.html";
            window.location.replace("UserDashboard.html");
        } 
    });


})
