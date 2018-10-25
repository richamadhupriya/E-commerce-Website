function login(){
	var userName = document.forms["loginForm"]["userName"].value;
	var password = document.forms["loginForm"]["password"].value;
	
	if(userName == "")
	{
		window.alert("Please enter your username."); 
        userName.focus(); 
        return false;
		
	}
	else if(password == "")
	{
		window.alert("Please enter your password."); 
        password.focus(); 
        return false;
		
	}
	else{
		window.location.assign("../html/dashboard.html")
	}
	
}