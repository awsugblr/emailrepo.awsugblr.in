/* Show Active Contacts */
function showActiveContacts(){
    $("#error").css('visibility', 'hidden');
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

            for(i=0;i<activecontacts.length;i++){
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + activecontacts[i]['FullName'] +
                    '</td><td>' + activecontacts[i]['EmailAddress'] +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Edit</span><a href="" class="block-user" style="color:green;"><span class="fa fa-edit"></span></a></div></td></tr>';
            }

            $('#contacts-list tbody').html(htmlcode);
        }
    });
}

/* Show Invalid Contacts */
function showInvalidContacts(){
    $("#error").css('visibility', 'hidden');
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

            for(i=0;i<invalidcontacts.length;i++){
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + invalidcontacts[i]['FullName'] +
                    '</td><td>' + invalidcontacts[i]['EmailAddress'] +
                    '</td><td>' + invalidcontacts[i]['Comments'] +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Edit</span><a href="" class="block-user" style="color:green;"><span class="fa fa-edit"></span></a></div></td></tr>';
            }

            $('#contacts-list tbody').html(htmlcode);
        }
    });
}

/* Add Contact */
function addNewContact(newcontactdetails){
    if((newcontactdetails.email) && (newcontactdetails.fullname))
    {
        $("#error").css('visibility', 'hidden');
        newcontacturl = "https://4mrf7a6hek.execute-api.ap-south-1.amazonaws.com/dev/addnewcontact";
        var obj = new Object();
        obj.email = newcontactdetails.email;
        obj.fullname = newcontactdetails.fullname;

        var jsonObj = JSON.stringify(obj);
        $.ajax({
            url: newcontacturl,
            headers: { "X-API-KEY": "6hBxkhk75V9y2ivgl23jy1958LATIZULaA7e1mBG", "Content-Type": "application/json" },
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(resp)
            {
                newcontactsuccess = resp['result'];
                if(newcontactsuccess === true){
                    $("#error").text('New contact successfully added.').css({'visibility':'visible','color':'green'});
                }
                else if(newcontactsuccess === false){
                    $("#error").text('Error : Contact already exists with this email address.').css('visibility', 'visible');
                }
            },
        });
    }
}

/* Login */
function login(authdetails)
{
	var result = null;
    if((authdetails.email) && (authdetails.password))
    {
        $("#error").css('visibility', 'hidden');
        passwordValue = SHA256(authdetails.password)
        //API Endpoint - Replace this with endpoint you created
        loginurl = 'https://4mrf7a6hek.execute-api.ap-south-1.amazonaws.com/dev/login';
        var obj = new Object();
        obj.email = authdetails.email;
        obj.password = passwordValue;

        var jsonObj = JSON.stringify(obj);

        $.ajax({
            url: loginurl,
            headers: { "X-API-KEY": "6hBxkhk75V9y2ivgl23jy1958LATIZULaA7e1mBG", "Content-Type": "application/json" },
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
