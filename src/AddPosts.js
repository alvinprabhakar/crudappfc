import { useState} from "react";

import "./AddPosts.css"


import Posts from "./Posts";

function AddPosts(){

    const [ addPost , setAddPost] = useState({userId:" ",title:" ",body:" "});

    // const [ title , setTitle ] = useState(" ");
    // const [ body , setBody ] = useState(" ");

    const [ newPost , setNewPost ] = useState(false);



 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addPost.userId,addPost.title,addPost.body);
        setNewPost(curr => !curr);

        //history.push("/posts" , {userId: addPost.userId, title: addPost.title, body: addPost.body })
    }

    // useEffect( () => {
    //   <Posts newPost={newPost} />
    // },[newPost])

    const handleAddPost = (e) => {
        //console.log(e);
        setAddPost({...addPost,[e.target.name]:e.target.value})
    }
//  {newPost ? <Posts newPost={newPost} /> : null}

    return (
        <>
      
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
        {newPost ? <Posts newPost={newPost} /> : null}
        </>
    )
}

export default AddPosts;