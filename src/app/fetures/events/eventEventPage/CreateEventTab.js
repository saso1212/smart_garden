import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
//import {connect} from 'react-redux';
import CreateEventPage from './CreateEventPage';


 class CreateEventTab extends Component {
    
  render() {
    return (
        <Grid>
        <CreateEventPage  />
         </Grid>
    
    )
  }
}


export default CreateEventTab
