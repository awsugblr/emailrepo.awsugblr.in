/* Login */
function login(auth_details)
{
	var result = null;
    if((auth_details.email) && (auth_details.password))
    {
        $("#error").css('visibility', 'hidden');
        passwordValue = SHA256(auth_details.password)
        //API Endpoint - Replace this with endpoint you created
        login_url = 'https://4mrf7a6hek.execute-api.ap-south-1.amazonaws.com/dev/login';
        var obj = new Object();
        obj.email = auth_details.email;
        obj.password = passwordValue;

        var jsonObj = JSON.stringify(obj);

        $.ajax({
            url: login_url,
            headers: { "X-API-KEY": "6hBxkhk75V9y2ivgl23jy1958LATIZULaA7e1mBG" },
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(result)
            {
                login_success = result['result'];
                //store userid in browser local storage
                // if (typeof(Storage) !== "undefined") {
                //     localStorage.setItem("user_id", result['uid']);
                // }
                console.log(login_success);
                if(login_success === true){
                    uid = result['uid']
                    window.location = './activeContacts.html';
                }else{
                    $("#error").text("*Invalid credentials");
                    $("#error").css('visibility', 'visible');
                }
            },
        });
    }
}
