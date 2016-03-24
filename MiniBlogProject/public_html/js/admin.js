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
      passsword = data[1].value;
      Backendless.UserService.login(email, password, true, true);
      
  });
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

