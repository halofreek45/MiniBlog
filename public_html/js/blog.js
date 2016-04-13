
$(function(){
    var APPLICATION_ID = "2990FB08-878B-34F0-FFD2-41F20EAC4200",
        SECRET_KEY = "F1D21139-75B1-0776-FF22-7C2F4CF2EB00",
        VERSION = "v1";
    
  Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  
  var postsCollection = Backendless.Persistence.of(Posts).find();
  $(".button-collapse").sideNav();
  console.log(postsCollection);
  
  var wrapper = {
      posts: postsCollection.data
  };
  
  Handlebars.registerHelper('format', function (time){
      return moment(time).format("dddd, MMMM ,Do YYYY");
      
  });
  
  
  var blogScript = $("#blogs-template").html();
  var blogTemplate = Handlebars.compile(blogScript);
  var blogHTML = blogTemplate(wrapper);
  
  $('.main-container').html(blogHTML);
    var blogScript = $("#blogs-title").html();
  var blogTemplate = Handlebars.compile(blogScript);
  var blogHTML = blogTemplate(wrapper);
  
  $('#slide-out').html(blogHTML);
  
});
  $(".button-collapse").sideNav();
   // Show sideNav
   
     
  
  // Hide sideNav
 
function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    //content.name = this.title;
    //console.log(content.name);
    this.authorEmail = args.authorEmail || "";
}