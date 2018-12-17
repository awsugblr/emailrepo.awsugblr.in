/* Login */
function login(auth_details)
{
	var result = null;
    if((auth_details.email) && (auth_details.password))
    {
        $("#error").css('visibility', 'hidden');
        passwordValue = SHA256(auth_details.password)
        //API Endpoint - Replace this with endpoint you created
        login_url = 'https://123abcdef789.execute-api.ap-south-1.amazonaws.com/lambda101/login';
        var obj = new Object();
        obj.email = auth_details.email;
        obj.password = passwordValue;

        var jsonObj = JSON.stringify(obj);

        $.ajax({
            url: login_url,
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(result)
            {
                login_success = result['result'];
                //store userid in browser local storage
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("user_id", result['uid']);
                }

                if(login_success === "true"){
                    uid = result['uid']
                    window.location = './users.html';
                }else{
                    $("#error").text("*Invalid credentials");
                    $("#error").css('visibility', 'visible');
                }
            },
        });
    }
}
