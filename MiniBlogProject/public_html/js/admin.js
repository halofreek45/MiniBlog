$(function(){
    var APPLICATION_ID = "2990FB08-878B-34F0-FFD2-41F20EAC4200",
        SECRET_KEY = "F1D21139-75B1-0776-FF22-7C2F4CF2EB00",
        VERSION = "v1";
    
  Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  
  var loginScript = $("#login-template").html();
  var loginTemplate = Handlebars.compile(loginScript);
  
  
  $('.main-container').html(loginTemplate);
  
  $(document).on('submit', '.form-signin', function(event){
      event.preventDefault();
      
      var data = $(this).serializeArray(),
      email = data[0].value,
      password = data[1].value;
      Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
      
  });
  
  
  $(document).on('click', '.add-blog', function()
  {
       var addBlogScript = $("#add-blog-template").html();
  var addBlogTemplate = Handlebars.compile(addBlogScript);
  
  
  $('.main-container').html(addBlogTemplate);
  });
  });

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user){
    console.log("user Logged in!");
    
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(user);
    
    $('.main-container').html(welcomeHTML);
}

function gotError(error){
    console.log("Error message -" + error.message);
    console.log("Error Code - " + error.code);
}