/* Enter Key Functionality */
function onKeyPressLogin(event)
{
    var email = $("#email").val();
    var password = $("#pwd").val();
    var auth_details = {
        email : email,
        password : password
    }
    var x = event.which || event.keyCode;
    if (x == 13){
        login(auth_details);
    }
}
