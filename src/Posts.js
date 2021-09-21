import axios from "axios";
import { useEffect , useState  } from "react";
import { Link } from "react-router-dom";

import {Table } from "react-bootstrap";
import './Posts.css';



function Posts(){

    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    //const USER_URL = "https://jsonplaceholder.typicode.com/users";
    const [postData , getPostData] = useState([]);
    const [ addPost , getaddPost] = useState({id:" ",userId:" ",title:" ",body:" "});

    const getAllPosts = async () => {
        const {data} = await axios.get(API_URL);
        console.log("getAllPosts called");
        console.log(data);
        getPostData(data);
    }

    const createPosts = async () => {
        console.log("create Posts called");
        const {data:post} = await axios.post(API_URL, {
            userId: addPost.userId,
            title: addPost.title,
            body: addPost.body,
        });
      
        let posts = [...postData];
        posts.push(post);
        console.log(posts);
        getPostData(posts);
    }

    const updatePost = async (id) => {
        console.log("update Posts called");
        const {data:post} = await axios.put(`${API_URL}/${id}` , {
            userId: addPost.userId,
            title: addPost.title,
            body: addPost.body,
    });
        console.log(post);        
        const posts = [...postData];
        const index = posts.findIndex((post) => post.id === id);
        console.log(index);
        posts[index] = post;
        getPostData(posts);
    }

    const deletePost = async (postId) => {
        const {data} = await axios.delete(`${API_URL}/${postId}`);
        console.log(`${data} `);
        let posts = [...postData];
        posts = posts.filter((post) => post.id !== postId);
        getPostData(posts);
    }

    // const ViewPost = async (userId) => {
    //     console.log("viewPosts");
    //     const {data} = await axios.get(`${USER_URL}/${userId}`);
    // }

    const setupdatePost = (postVal) => {
    
    let posts = [...postData];
    posts = posts.filter((post) => post.id === postVal.id);
    console.log(posts);
        getaddPost({...postVal});
        console.log(addPost);
    }

    // const AddPost =  () => {
    //      getaddPost(curr => !curr);
    // }

    useEffect( () => {
            getAllPosts();     
    } , [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(addPost.id,addPost.userId,addPost.title,addPost.body,postData.id);
        let posts = [...postData];
        console.log(posts);
        if(addPost.id !== " " )
        updatePost(addPost.id);
        else
            createPosts();
        
    }

    const handleAddPost = (e) => {
        getaddPost({...addPost,[e.target.name]:e.target.value})
    }

    return (
        <>
        <div className="AddPost">
        <h3>Posts Details</h3>
         </div>
        <div>
        <div>
        <div>
            <h3>Add New Posts</h3>
        </div>
        <div className="formsClass">
        <form onSubmit={handleSubmit}>
          <div>
            <label><span>User Id</span></label><br />
            <input name = "userId" type="text" value = {addPost.userId} onChange={handleAddPost} required/>
          </div>
          <br />
          <div>
          <label><span>Title</span></label><br />
            <input name="title" type="text" value = {addPost.title} onChange={handleAddPost} required/>
          </div>
          <br />
          <div>
          <label><span>Body</span></label><br />
            <input name="body" type="text" value = {addPost.body} onChange={handleAddPost} required/>
          </div>
          <br />
          <div>
              <button type="submit">Submit</button>
          </div>
          <br />
          </form>
        </div>
        </div>
      
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>PostId</th>
                <th>UserId</th>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {postData.map((post,index) => {
                    return (
                        <tr key={index}>
                        <td>{post.id}</td>
                        <td>{post.userId}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td className="actions">
                        <Link to={ `/posts/${post.userId}`}>
                        <button id="view">
                               View</button>
                        </Link>
                            <button id="update" onClick={() => setupdatePost(post)}>Update</button>
                            <button id="delete" onClick={() => deletePost(post.userId)}>Delete</button>
                        </td>
                    </tr>
                    )
                })
                }
            </tbody>
        </Table>
        </div>
      
        </>

    )
}

export default Posts;


