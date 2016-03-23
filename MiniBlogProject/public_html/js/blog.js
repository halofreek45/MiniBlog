$(function(){
    var APPLICATION_ID = "2990FB08-878B-34F0-FFD2-41F20EAC4200",
        SECRET_KEY = "F1D21139-75B1-0776-FF22-7C2F4CF2EB00",
        VERSION = "v1";
    
  Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  
  var dataStore = Backendless.Persistence.of(Posts);
  var post = new Posts({title: "My First Blog Post", content:"My first Blog content", email:"email@email.com" });
  dataStore.save(post);
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.emailEmail || "";
}