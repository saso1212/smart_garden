import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
import{activeIndex} from '../eventActions'
import {connect} from 'react-redux';
import CreateEventPage from './CreateEventPage';


 class CreateEventTab extends Component {
    
    chageTab =(e,data)=>{        
     this.props.activeIndex(data)
    }
  render() {
    return (
        <Grid>
        <CreateEventPage chageTab={this.chageTab} />
         </Grid>
    
    )
  }
}

const actions ={
activeIndex
}
export default connect(null,actions)(CreateEventTab)
