import './PostDetails.css';
import {useState , useEffect} from "react";
import axios from 'axios';


function PostDetails({match}){

    const API_URL = "https://jsonplaceholder.typicode.com";
  

   
    const [ comments , setComments] = useState([]);
    const [ user , setUser] = useState({name:" ",email:" ",company:" ",website:" "});
    const [ post , setPost] = useState({title:" ",body:" "});

    

    let getDetails = async () => {
        console.log("get Details");
        try{
          

            const {data:commentdata} = await axios.get(`${API_URL}/comments?postId=${match.params.id}`);

            const {data:userdata} = await axios.get(`${API_URL}/users/${match.params.id}`);

            const {data:postdata} = await axios.get(`${API_URL}/posts/${match.params.id}`);


            setComments(commentdata);
           setUser(userdata);
            setPost(postdata);

         
    
        }
        catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        getDetails();
    },[]);


    return (
        <>
          
          <div className="userinfo">
            <p className="userHeading">User Details</p>
            <p><span>Name : </span>{user.name}</p>
            <p><span>email : </span>{user.email}</p>
            <p><span>Company : </span>{user.company.name}</p>
            <p><span>Website : </span>{user.website}</p>
        </div> 

        <div className="postinfo">
            <p className="postHeading">Post Details</p>
            <p><span>Title : </span>{post.title}</p>
            <p><span>Body : </span>{post.body}</p>
        </div> 

        <p className="commentHeading">Comments</p>
        <div >
         
            {comments.map((comment) => {
                return(
                    <>
                    <div  key={comment.id} className="commentsinfo">
                        <div className="comments">
                    <p ><span>Name : </span>{comment.name}</p>
                    <p ><span>Email : </span>{comment.email}</p>
                    </div>
                  <p><span>Body : </span>{comment.body}</p>
                  </div>
                  </>
                )
            })}
         
        </div> 

           
     
    
        
        </>
    )
}


export default PostDetails;