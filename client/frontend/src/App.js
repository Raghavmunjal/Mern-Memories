import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import AuthLogin from './Components/Auth/Auth-Login'
import AuthRegister from './Components/Auth/Auth-Register'

const App = () => {

    return (
        <Router>
            <Container maxWidth="lg">
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth/login' exact component={AuthLogin} />
                    <Route path='/auth/register' exact component={AuthRegister} />
                </Switch>
            </Container>
        </Router>
    )
}

export default App
