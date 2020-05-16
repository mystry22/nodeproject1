$(document).ready(function(){
var user;

$('#sub').click(function(){
 user = $('#user').val();


 $.post('/login',{user:user},function(data){
     if(data==='ok'){
      window.location.href='/admin';
    }
 });
 
});

});