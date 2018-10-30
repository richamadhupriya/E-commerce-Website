function login(){
	var user = document.loginForm.userName.value;
	var pass = document.loginForm.password.value;
	
	if(user == "")
	{
		window.alert("Please enter your username."); 
        user.focus(); 
        return false;
		
	}
	else if(pass == "")
	{
		window.alert("Please enter your password."); 
        pass.focus(); 
        return false;
		
	}
	else if(user == "admin" && pass== "admin")
	{
		window.alert("You have logged into admin account")
		window.open("../html/admin.html")
	}
	else{
		window.location.assign("../html/home.html")
		
	}
	
	
}