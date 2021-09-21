import {BrowserRouter , Route , Switch ,  Redirect } from "react-router-dom";
import {Navbar , Container , Nav} from "react-bootstrap";
import Home from "./Home";
import About from "./About";
import Posts from "./Posts";
import AddPosts from "./AddPosts";
import PostDetails  from "./PostDetails";



function App(){
  return (
    <BrowserRouter>
    <Navbar bg="dark" variant="dark">
            <Container>
                <img src="/favicon.ico" alt="" />
                <Nav className="ml-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/posts">Posts</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    <Switch>
    <Route exact path = "/" component={Home} />
    <Route path = "/about" component={About} />
    <Route path = "/posts/:id" component={PostDetails} />
    <Route exact path = "/posts/add" component={AddPosts} />
    <Route path = "/posts" component = {Posts} />
    <Route path = "/home" >
      <Redirect to = "/" />
    </Route>
 
    </Switch>
    </BrowserRouter>
  )
}

export default App;