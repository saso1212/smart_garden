import React ,{Component} from 'react'
import EventForm1 from '../eventForm/EventForm1';
import {connect} from 'react-redux'
import EventForm2 from '../eventForm/EventForm2';
import EventForm3 from '../eventForm/EventForm3';
import EventFormAll from '../eventForm/EventFormAll'


import {Tab,Grid,Header,Segment} from 'semantic-ui-react'

const panes = [
    {menuItem: 'Valve 1', pane: {key: 'valve1'},render:()=><EventForm1/>},
    {menuItem: 'Valve 2', pane: {key: 'valve2'},render:()=><EventForm2/>},
    {menuItem: 'Valve 3', pane: {key: 'valve3'},render:()=><EventForm3/>},
    {menuItem: 'All Valves', pane: {key: 'all_valves'},render:()=><EventFormAll/>}
   
  ]

class  CreateEventPage extends Component  {
 
   
    render() {
    
  return (
     <Grid>
    <Grid.Column width={12}  >
        <Segment attached  > 
        <Header icon="calendar" content="Events" />
        <Tab  panes={panes}   menu={{ pointing: true}}  />
        <br/>
      
        </Segment>
    </Grid.Column>
    </Grid>
     )
    }
}

const mapStateToProps=(state, ownProps)=>{
  return{
    activeIndex:state.events
  }
}
export default connect(mapStateToProps)(CreateEventPage);
