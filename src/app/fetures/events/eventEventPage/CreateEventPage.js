import React ,{Component} from 'react'
import EventForm from '../eventForm/EventForm';
import {connect} from 'react-redux'
import{activeIndex} from '../eventActions'
import {Tab,Grid,Header,Segment} from 'semantic-ui-react'

const panes = [
    {menuItem: 'Valve 1', pane: {key: 'valve1'},render:()=><EventForm/>},
    {menuItem: 'Valve 2', pane: {key: 'valve2'},render:()=><EventForm/>},
    {menuItem: 'Valve 3', pane: {key: 'valve3'},render:()=><EventForm/>},
    {menuItem: 'All Valves', pane: {key: 'all_valves'},render:()=><EventForm/>}
   
  ]

class  CreateEventPage extends Component  {
  changeTab =(e,data)=>{    
  //  console.log(data.activeIndex);  
   this.props.activeIndex(data.activeIndex);
   
  }
   
    render() {
       
  return (
     <Grid>
    <Grid.Column width={12}  >
        <Segment attached  > 
        <Header icon="calendar" content="Events" />
        <Tab  panes={panes} onTabChange={(e, data) => this.changeTab(e, data)}  menu={{ pointing: true}}  />
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
const actions ={
  activeIndex
  }
export default connect(mapStateToProps,actions)(CreateEventPage);


