/* Show Active Contacts */
function showActiveContacts(){
    //get userid from browser local storage
    // var userid = localStorage.getItem("userid");
    //API Endpoint - Replace this with endpoint you created
    var activecontactsurl = 'https://4mrf7a6hek.execute-api.ap-south-1.amazonaws.com/dev/activecontacts';

    $.ajax({
        url: activecontactsurl,
        headers: { "X-API-KEY": "6hBxkhk75V9y2ivgl23jy1958LATIZULaA7e1mBG" },
        type: 'GET',
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            var activecontacts = result['contacts'];
            htmlcode = "";
            // console.log(activecontacts.length);

            for(i=0;i<activecontacts.length;i++){
                console.log(activecontacts[i]['FullName']);
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + activecontacts[i]['FullName'] +
                    '</td><td>' + activecontacts[i]['EmailAddress'] +
                    // '</td><td><span style="color:#4ef71b;text-align:center;" class="fa fa-circle"></span>' +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Edit</span><a href="" class="block-user" style="color:green;"><span class="fa fa-edit"></span></a></div></td></tr>';
            }

            $('#contacts-list tbody').html(htmlcode);
        }
    });
}

/* Show Invalid Contacts */
function showInvalidContacts(){
    //get userid from browser local storage
    // var userid = localStorage.getItem("userid");
    //API Endpoint - Replace this with endpoint you created
    var invalidcontactsurl = 'https://4mrf7a6hek.execute-api.ap-south-1.amazonaws.com/dev/invalidcontacts';

    $.ajax({
        url: invalidcontactsurl,
        headers: { "X-API-KEY": "6hBxkhk75V9y2ivgl23jy1958LATIZULaA7e1mBG" },
        type: 'GET',
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            invalidcontacts = result['contacts'];
            htmlcode = "";

            // htmlcode += '<td>' + contactsinfo['FullName'] +
            //         '</td><td>' + contactsinfo['EmailAddress'] +
            //         '</td><td>' + contactsinfo['Comments'] +
            //         '</td><td><span style="color:#4ef71b;text-align:center;" class="fa fa-circle"></span>' +
            //         '</td><td><div class="tooltip"><span class="tooltiptext">Edit</span><a href="" class="block-user" style="color:red;"><span class="fa fa-ban"></span></a></div></td></tr>';

            for(i=0;i<invalidcontacts.length;i++){
                console.log(invalidcontacts[i]['FullName']);
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + invalidcontacts[i]['FullName'] +
                    '</td><td>' + invalidcontacts[i]['EmailAddress'] +
                    '</td><td>' + invalidcontacts[i]['Comments'] +
                    // '</td><td><span style="color:#4ef71b;text-align:center;" class="fa fa-circle"></span>' +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Edit</span><a href="" class="block-user" style="color:green;"><span class="fa fa-edit"></span></a></div></td></tr>';
            }

            $('#contacts-list tbody').html(htmlcode);
        }
    });
}

/* Add Contact */
//TODO: Finish this function and modify values accordingly
function addNewContact(request_login_details){
    // var env_value = localStorage.getItem("snauth_env_value");
	// var pwd = request_login_details.password;
	// var confpwd = request_login_details.confpassword;
	// if(request_login_details.email === '@bridgei2i.com' || request_login_details.name === '' || request_login_details.comments === '' || pwd === '' || confpwd === ''){
	//     $("#error").text('*Please fill all mandatory fields.').css('visibility', 'visible');
	// }
	// else if(pwd !== confpwd || pwd.length < 7 || confpwd.length < 7){
	// 	$("#error").text('*Password Mismatch.').css('visibility', 'visible');
	// }
	// else if((request_login_details.email).includes('@bridgei2i.com') && (request_login_details.email).length > 14){
		if((request_login_details.email) && (request_login_details.password) && (request_login_details.name) && (request_login_details.comments))
		{
			$("#error").css('visibility', 'hidden');
			passwordValue = SHA256(request_login_details.password)
			login_api_url = "https://abc123mno987.execute-api.ap-south-1.amazonaws.com/snauth/" + env_value + "RequestLogin";
			var obj = new Object();
			obj.name = request_login_details.name;
            obj.email = request_login_details.email;
            obj.comments = request_login_details.comments;
            obj.password = passwordValue;

            var jsonObj = JSON.stringify(obj);
			$.ajax({
				url: login_api_url,
				type: 'POST',
				data: jsonObj,
				dataType: 'json',
				success: function(resp)
				{
					login_success = resp['result'];
					if(login_success === "true"){
						$("#error").text('Your request has been received and is under review. If this is urgent, please contact administrator.').css({'visibility':'visible','color':'green'});;
						setTimeout(function(){ window.location = './index.html'; }, 5000);
					}
					else if(login_success === "user exists"){
						$("#error").text('Error : User already exists with this Email Address.').css('visibility','visible');
					}
				},
			});
		}
		// else{
		// 	$("#error").text("*Please fill all mandatory fields.");
		// 	$("#error").css('visibility', 'visible');
		// }
	// }
	// else{
	// 	$("#error").text("*Please use COMPANY Email ID to Register.");
	// 	$("#error").css('visibility', 'visible');
	// }
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
        loginurl = 'https://4mrf7a6hek.execute-api.ap-south-1.amazonaws.com/dev/login';
        var obj = new Object();
        obj.email = auth_details.email;
        obj.password = passwordValue;

        var jsonObj = JSON.stringify(obj);

        $.ajax({
            url: loginurl,
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
                // console.log(login_success);
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
