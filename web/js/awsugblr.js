/* Show User Info */
function showUserInfo(){
    //get userid from browser local storage
    var user_id = localStorage.getItem("user_id");
    //API Endpoint - Replace this with endpoint you created
    var info_url = ' https://123abcdef789.execute-api.ap-south-1.amazonaws.com/lambda101/users';

    $.ajax({
        url: info_url,
        type: 'GET',
        data : {"user_id" : user_id},
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            user_info = result['values'];
            html_code = "";

            html_code += '<td>' + user_info['name'] +
                    '</td><td>' + user_info['email'] + '</td><td>' + user_info['location'] + '</td><td>' + user_info['comments']
                    '</td><td><span style="color:#4ef71b;text-align:center;" class="fa fa-circle"></span>' +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Block</span><a href="" class="block-user" style="color:red;"><span class="fa fa-ban"></span></a></div></td></tr>';

            $('#users-list tbody').html(html_code);
        }
    });
}

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

/* Login Registration */
function loginRegistration(login_registration){
	if((login_registration.email) && (login_registration.password) && (login_registration.name) && (login_registration.comments) && (login_registration.location))
    {
        passwordValue = SHA256(login_registration.password)
        //API Endpoint - Replace this with endpoint you created
        login_reg_url = 'https://123abcdef789.execute-api.ap-south-1.amazonaws.com/lambda101/register-login';
        var obj = new Object();
        obj.name = login_registration.name;
        obj.email = login_registration.email;
        obj.password = passwordValue;
        obj.location = login_registration.location;
        obj.comments = login_registration.comments;

        var jsonObj = JSON.stringify(obj);
        $.ajax({
            url: login_reg_url,
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(resp)
            {
                login_success = resp['result'];
                if(login_success === "true"){
                    $("#error").text('Your login registration successful. You may now login.').css({'visibility':'visible','color':'green'});;
                    setTimeout(function(){ window.location = './index.html'; }, 5000);
                }
                else if(login_success === "user exists"){
                    $("#error").text('Error : User already exists with this Email Address.').css('visibility','visible');
                }
            },
        });
    }
}
