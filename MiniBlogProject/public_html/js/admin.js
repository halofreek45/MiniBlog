$(function(){
    var APPLICATION_ID = "2990FB08-878B-34F0-FFD2-41F20EAC4200",
        SECRET_KEY = "F1D21139-75B1-0776-FF22-7C2F4CF2EB00",
        VERSION = "v1";
    
  Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  //Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
  
  if(Backendless.UserService.isValidLogin()){
            
      userLoggedIn(Backendless.LocalCache.get("current-user-id"));
      //
      
  } 
  else
  {
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
  }
  
  $(document).on('submit', '.form-signin', function(event){
      event.preventDefault();
      
      var data = $(this).serializeArray(),
      email = data[0].value,
      password = data[1].value;
      Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError2));
      
  });
  
  
  $(document).on('click', '.add-blog', function()
  {
       var addBlogScript = $("#add-blog-template").html();
  var addBlogTemplate = Handlebars.compile(addBlogScript);
  
  
  $('.main-container').html(addBlogTemplate);
  });
  
  $(document).on('submit', '.form-add-blog', function (event)
  {
  event.preventDefault();
  var data = $(this).serializeArray(),
  title = data[0].value,
  content = data[1].value;
  
  var dataStore = Backendless.Persistence.of(Posts);
  
  var postObject = new Posts({
      title: title,
      content: content,
      authorEmail: Backendless.UserService.getCurrentUser().email
  });
  dataStore.save(postObject);
  
  this.title.value = "";
  this.content.value = "";
  });
  
     $(document).on('click', '.logout', function (){
         Backendless.UserService.logout(new Backendless.Async(LoggedOut, gotError));
         
         var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
     });
  });

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.content.name = "WHYME"; 
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user, email){
    console.log("user Logged in!");
    var userData;
    if(typeof user === "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
        
    }
    else
    {
        userData = user;
    }
    Materialize.toast("Thank you for logging in as " + Backendless.UserService.getCurrentUser().email, 2000);
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}
function LoggedOut(){
    console.log('User Logged out');
}
function gotError(error){
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
}
function gotError2(error){
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
Materialize.toast("Incorrect Username or Password");
}