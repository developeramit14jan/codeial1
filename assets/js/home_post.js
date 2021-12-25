// {
//     // create post form
//     let createPost = function(){
//         let newPostForm = $('#new-post-form');
//         newPostForm.submit(function(event){
//             // event.preventdefault is used to prevent from submit without your permission
//             // of js
//       event.preventDefault();
//       // submit the form in the ajax form
//       $.ajax({
//           type:'post',
//           url:'/post/user-post',
//           data:newPostForm.serialize(),
//           success:function(data){
//              console.log(data.data.post.content);
//             let newPost = newPostDom(data.data.content);
//             $('#post-list-container>ul').prepend(newPost);
//           },error:function(error){
//               console.log(error.responseText);
//           }
//       });
//         });
//     }
// // method to create post in dom
// let newPostDom =function(post){
//     return $(`<div id="post">

    
//         <small>
//             <a class ="delete-post-button" href="/post/destroy/${post.id}">X</a>
//         </small>
//         <small>${post.user.Name}</small>
//         <li>${post.content}  
    
//         <div  class ="post-comment">
           
//                 <form action="/comments/create" method="POST">
//                   <input type="text" name ="content" placeholder="Type here to reply...">
//                   <input type="hidden" name ="post" , value="${post._id}">
//                   <input type="submit" , value="Add Comment">
                
//                 </form>
                
    
//                 <div class ="post-comments-list">
//                     <ul id="post-comment-${post._id}">
    
                        
    
//                     </ul>
    
//                 </div>
            
                
//         </div>

// </div>`)
// }   
//     createPost();
// }