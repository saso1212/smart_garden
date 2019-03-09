import React ,{Component} from 'react'
import {reduxForm, Field} from 'redux-form';
import {Segment,Form} from 'semantic-ui-react';
import  SelectInput from '../../common/form/SelectInput'
//import { connect } from 'react-redux';





class TestArea extends Component {

    render(){
        const  values=[
            {key:'1',text:'0:10', value:'0:10'},{key:'2',text:'0:20', value:'0:20'},{key:'3',text:'0:30', value:'0:30'}, {key:'4',text:'0:40', value:'0:40'},{key:'5',text:'0:50', value:'0:50'},{key:'6',text:'1:00', value:'1:00'},
            {key:'7',text:'1:10',value:'1:10'},{key:'8',text:'1:20', value:'1:20'},{key:'8',text:'1:30', value:'1:30'},{key:'9',text:'1:40', value:'1:40'}, {key:'10',text:'1:50', value:'1:50'},{key:'11',text:'2:00', value:'2:00'},
            {key:'12',text:'2:10',value:'2:10'},{key:'12',text:'2:20', value:'2:20'},{key:'13',text:'2:30', value:'2:30'},{key:'14',text:'2:40', value:'2:40'}, {key:'15',text:'2:50', value:'2:50'},{key:'16',text:'3:00', value:'3:00'},
            {key:'17',text:'3:10',value:'3:10'},{key:'18',text:'3:20', value:'3:20'},{key:'19',text:'3:30', value:'3:30'},{key:'20',text:'3:40', value:'3:40'}, {key:'21',text:'3:50', value:'3:50'},{key:'22',text:'4:00', value:'4:00'},
            {key:'23',text:'4:10',value:'4:10'},{key:'24',text:'4:20', value:'4:20'},{key:'25',text:'4:30', value:'4:30'},{key:'26',text:'4:40', value:'4:40'}, {key:'27',text:'4:50', value:'4:50'},{key:'28',text:'5:00', value:'5:00'},
            {key:'29',text:'5:10',value:'5:10'},{key:'30',text:'5:20', value:'5:20'},{key:'31',text:'5:30', value:'5:30'},{key:'32',text:'5:40', value:'5:40'}, {key:'33',text:'5:50', value:'5:50'},{key:'34',text:'6:00', value:'6:00'},
            {key:'35',text:'6:10',value:'6:10'},{key:'36',text:'6:20', value:'6:20'},{key:'37',text:'6:30', value:'6:30'},{key:'38',text:'6:40', value:'6:40'}, {key:'39',text:'6:50', value:'6:50'},{key:'40',text:'7:00', value:'7:00'},
            {key:'41',text:'7:10',value:'7:10'},{key:'42',text:'7:20', value:'7:20'},{key:'43',text:'7:30', value:'7:30'},{key:'44',text:'7:40', value:'7:40'}, {key:'45',text:'7:50', value:'7:50'},{key:'46',text:'8:00', value:'8:00'},
            {key:'47',text:'8:10',value:'8:10'},{key:'48',text:'8:20', value:'8:20'},{key:'49',text:'8:30', value:'8:30'},{key:'50',text:'8:40', value:'8:40'}, {key:'51',text:'8:50', value:'8:50'},{key:'52',text:'9:00', value:'9:00'},
            {key:'53',text:'9:10',value:'9:10'},{key:'54',text:'9:20', value:'9:20'},{key:'55',text:'9:30', value:'9:30'},{key:'56',text:'9:40', value:'9:40'}, {key:'57',text:'9:50', value:'9:50'},{key:'58',text:'10:00', value:'10:00'}
          ];
        
    // const {invalid, submitting, pristine,event,cancelToggle} = this.props;
  return (
      <Segment>
     <Form>
     <Field name='amount' 
      type='text' 
      options={values}
      component={SelectInput} 
      placeholder='Please chose duration of irigation'/>
    </Form>
    </Segment>
  )
}
}


export default (reduxForm({form: 'testForm',enableReinitialize:true})(TestArea));
