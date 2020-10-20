import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'

import Home from './home/Home'
import Votes from './votes/Votes'
import Tickets from './tickets/Tickets'
import Groups from './groups/Groups'
import Setting from './setting/Setting'


function RoutePage () {
    return(
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/votes' component={Votes} />
            <Route path='/tickets' component={Tickets} />
            <Route path='/groups' component={Groups} />
            <Route path='/setting' component={Setting} />
        </Switch>
    )
}

export default RoutePage;