import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Home from './Components/Home/Home'
import AuthLogin from './Components/Auth/Auth-Login'
import AuthRegister from './Components/Auth/Auth-Register'
import PostDetails from './Components/PostDetails/PostDetails'

const App = () => {

    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={()=> <Redirect to='/posts'/>} />
                    <Route path='/posts' exact component={Home} />
                    <Route path='/posts/search' exact component={Home} />
                    <Route path='/posts/:id' exact component={PostDetails} />
                    <Route path='/auth/login' exact component={AuthLogin} />
                    <Route path='/auth/register' exact component={AuthRegister} />
                </Switch>
            </Container>
        </Router>
    )
}

export default App
