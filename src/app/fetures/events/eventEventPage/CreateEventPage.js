import React ,{Component} from 'react'
import EventForm from '../eventForm/EventForm'
//import {Link} from 'react-router-dom'

import {Tab,Grid,Header,Segment} from 'semantic-ui-react'

const panes = [
    {menuItem: 'Valve 1', pane: {key: 'valve1'}},
    {menuItem: 'Valve 2', pane: {key: 'valve2'}},
    {menuItem: 'Valve 3', pane: {key: 'valve3'}}
  ]

class  CreateEventPage extends Component  {

    chageTab=(e,data)=>{
        console.log(data);
    }
    render() {
  return (
     <Grid>
    <Grid.Column width={12}  >
        <Segment attached  > 
        <Header icon="calendar" content="Events" />
        <Tab  onTabChange={(e, data) => this.changeTab(e, data)} panes={panes} menu={{ pointing: true}} />
        <br/>
        <EventForm/>
        </Segment>
    </Grid.Column>
    </Grid>
  )
    }
}

export default CreateEventPage;
