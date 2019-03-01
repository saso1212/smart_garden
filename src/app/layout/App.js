import React, { Component } from 'react';
import  {Route,Switch} from 'react-router-dom';
import HomePage from '../fetures/home/HomePage';
import NavBar from '../fetures/Nav/Navbar/Navbar';
import ModalMenager from '../fetures/modals/ModalMenager'
import {Container} from 'semantic-ui-react';
import SettingsDashboard from '../fetures/users/Settings/SettingDashboard'
//import EventForm from '../fetures/events/eventForm/EventForm'
import CreateEventPage from '../fetures/events/eventEventPage/CreateEventPage'
import TestArea from '../fetures/testArea/TestArea'
import './App.css';
//import CreateEventPage from '../fetures/events/eventEventPage/CreateEventPage';

class App extends Component {
  render() {
    return (
     <div> 
       <ModalMenager/>
       <Switch> 
         <Route exact path='/' component={HomePage}/> 
       </Switch>
       <Route path='/(.+)' render={()=>(
          <div>
          <NavBar/>
          <Container className='main'>
         <Switch>
          {/* <Route path='/events' component={EventDashboard}/> */}
          {/* <Route path='/event/:id' component={EventDetailedPage}/>
          <Route path='/menage/:id' component={EventForm}/>
          <Route path='/people' component={PeopleDashboard}/>
          <Route path='/profile/:id' component={UserDetailedPage}/>
          <Route path='/settings' component={SettingsDashboard}/>
       <Route path='/createEvent' component={EventForm}/> */}
       <Route path='/settings' component={SettingsDashboard}/>
          <Route path='/test' component={TestArea}/> 
           <Route path='/createEvent' component={CreateEventPage}/>
        </Switch>
       </Container>
        </div>
       )}
       />
       </div>
    )
  }
}

export default App;
