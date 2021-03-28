import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from 'components/navbar/Navbar';
import Home from 'components/home/Home';
import Auth from 'components/auth/Auth';
import News from 'components/news/News';

const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth' exact component={Auth} />
                    <Route path='/news' exact component={News} />
                    <Route path='/bookmarked-news' exact 
                        render={(props) => (
                            <News {...props} />
                        )} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;