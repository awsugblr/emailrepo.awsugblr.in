/* Enter key functionality */
function onKeyPressLogin(event)
{
    var email = $("#email").val();
    var password = $("#pwd").val();
    var authdetails = {
        email : email,
        password : password
    }
    var x = event.which || event.keyCode;
    if (x == 13){
        login(authdetails);
    }
}

function onKeyPressAddContact(event)
{
    var email = $("#email").val();
    var fullname = $("#fullname").val();
    var addcontactdetails = {
        email : email,
        fullname : fullname
    }
    var x = event.which || event.keyCode;
    if (x == 13){
        addNewContact(addcontactdetails);
    }
}
