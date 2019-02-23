import React ,{Component} from 'react'
import {reduxForm, Field} from 'redux-form';
import {Segment,Form} from 'semantic-ui-react';
import  SelectInput from '../../common/form/SelectInput'
//import { connect } from 'react-redux';




class TestArea extends Component {

    render(){
        const  values=[
            {key:'0',text:'0',value:0},{key:'1',text:'0:10', value:'0:10'},{key:'2',text:'0:20', value:'0:20'},{key:'3',text:'0:30', value:'0:30'}, {key:'4',text:'0:40', value:'0:40'},{key:'5',text:'0:50', value:'0:50'},{key:'6',text:'1:00', value:'1:00'},
            {key:'7',text:'1:10',value:'1:10'},{key:'8',text:'1:20', value:'1:20'},{key:'8',text:'1:30', value:'1:30'},{key:'9',text:'1:40', value:'1:40'}, {key:'10',text:'1:50', value:'1:50'},{key:'11',text:'2:00', value:'2:00'},
            {key:'12',text:'2:10',value:'2:10'},{key:'12',text:'2:20', value:'2:20'},{key:'13',text:'2:30', value:'2:30'},{key:'14',text:'2:40', value:'2:40'}, {key:'15',text:'2:50', value:'2:50'},{key:'16',text:'3:00', value:'3:00'},
            {key:'0',text:'0',value:0},{key:'1',text:'0:10', value:'0:10'},{key:'2',text:'0:20', value:'0:20'},{key:'3',text:'0:30', value:'0:30'}, {key:'4',text:'0:40', value:'0:40'},{key:'5',text:'0:50', value:'0:50'},{key:'6',text:'1:00', value:'1:00'},
            {key:'10',text:'10', value:10},
            {key:'11',text:'11', value:11},
            {key:'12',text:'12', value:12},
            {key:'13',text:'13', value:13},
            {key:'14',text:'14', value:14},
            {key:'15',text:'15', value:15},
          ];
        
    // const {invalid, submitting, pristine,event,cancelToggle} = this.props;
  return (
      <Segment>
     <Form>
     <Field name='amount' 
        type='text' 
       options={values}
                      // multiple={true}
      component={SelectInput} 
      placeholder='Please chose duration of irigation'/>
    </Form>
    </Segment>
  )
}
}


export default (reduxForm({form: 'testForm',enableReinitialize:true})(TestArea));
