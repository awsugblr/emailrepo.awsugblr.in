// TODO - work on this from start
$(document).on('click', '.make-active', function(){
    var email = ($(this).parent().parent().parent().find("td:eq(2)").text()).trim();
    var isyes = confirm('Are you sure, you want to make this user active?');
    var allowuserurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/allowuser';

    var obj = new Object();
    obj.email = email;

    var jsonObj = JSON.stringify(obj);

    if(isyes) {
        $.ajax({
            url: allowuserurl,
            headers: {"Content-Type": "application/json"},
            type: 'PUT',
            data: jsonObj,
            dataType: 'json',
            async: false,
            success: function(data)
            {
                if(data['result']==="success")
                {
                    return true;
                }
            }
        });
    }
    else {
       return false;
    }
})

// TODO - work on this from start
$(document).on('click', '.make-invalid', function(){
    var email = ($(this).parent().parent().parent().find("td:eq(2)").text()).trim();
    var isyes = confirm('Are you sure, you want to block user?');
    var blockuserurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/blockuser';
    var obj = new Object();
    obj.email = email;

    var jsonObj = JSON.stringify(obj);

    if(isyes) {
        $.ajax({
            url: blockuserurl,
            headers: {"Content-Type": "application/json"},
            type: 'PUT',
            data: jsonObj,
            dataType: 'json',
            async: false,
            success: function(data)
            {
                if(data['result']==="success")
                {
                    return true;
                }
            }
        });
    }
    else {
       return false;
    }
})

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
                    '</td><td><div class="tooltip"><span class="tooltiptext">Make Invalid</span><a href="" class="make-invalid" style="color:green;"><span class="fa fa-user-times"></span></a></div></td></tr>';
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
                    '</td><td><div class="tooltip"><span class="tooltiptext">Make Active</span><a href="" class="make-active" style="color:green;"><span class="fa fa-user-plus"></span></a></div></td></tr>';
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
