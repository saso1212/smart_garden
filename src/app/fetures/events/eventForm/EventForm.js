// /*global google */
import React, { Component } from 'react';
import {Segment,Form,Button,Grid,Header} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';
import { withRouter } from 'react-router'
// import {composeValidators,combineValidators,isRequired,hasLengthGreaterThan,isNumeric} from 'revalidate';
import {combineValidators,isRequired,isNumeric,composeValidators,createValidator} from 'revalidate';
//import Script from 'react-load-script';
//import {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import {createEvent,updateEvent} from '../eventActions';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';
import DateInput from '../../../common/form/DateInput';
import CheckboxInput from '../../../common/form/CheckboxInput'
//import PlaceInput from '../../../common/form/PlaceInput';
import {calculateDate} from '../../../common/utility/helpers'
import { cancelToggle,activeIndex} from '../eventActions'
import {connect} from 'react-redux';
import moment from 'moment'
import isAfter from 'date-fns/is_after'
import { withFirestore } from 'react-redux-firebase';



class EventForm1 extends Component {
  state={
    scriptLoaded: false,
    value:false,
    date1:null
  }

//   async componentDidMount(){

//     const {firestore, match}=this.props;
//     //this is like a get request 
//     //with this request in firestore.ordered we take the single event with match id
//     //and we get only during componentDidMount
//     // let event= await firestore.get(`events/${match.params.id}`);
//     //  if(event.exists){
//     //    this.setState({
//     //      //we must use data() function to take the data from event
//     //      venueLatLng:event.data().venueLatLng
//     //    })
//     //  }
//     //with setListener we get the data on every changes
//    await firestore.setListener(`events/${match.params.id}`);

//   }

//  async componentWillUnmount(){
//     const {firestore, match}=this.props;
//     //beacuse in the firestore in the listener if we dont unlisten it will
//     //stay during opening  other pages
//     await firestore.unsetListener(`events/${match.params.id}`);

//   }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

 

   
    onFormSubmit=values=>{
   
    console.log(calculateDate(values.date,values.timeamount));
       if (this.props.initialValues.id){
      
          this.props.updateEvent(values);
          this.props.history.goBack();
        
       }
        else
        {
          this.props.createEvent(values,this.props.activeIndex1)};
          this.props.history.push('/events');
    }
    handleChange = (e, { value }) => this.setState((prevState)=>{
      return{value:!prevState.value}
    })
    handleChangeDate1=(e,val)=>{
      return  this.setState({isValide:isAfter(moment(val).toDate(),new Date(Date.now()))});
    }
   
   
    render() {
      const timeValues=[ {key:'-1',text:'0:10', value:'0:10'},{key:'0',text:'0:20', value:'0:20'},{key:'1',text:'0:30', value:'0:30'}, {key:'2',text:'0:40', value:'0:40'},{key:'3',text:'0:50', value:'0:50'},{key:'4',text:'1:00', value:'1:00'},
      {key:'5',text:'1:10',value:'1:10'},{key:'6',text:'1:20', value:'1:20'},{key:'7',text:'1:30', value:'1:30'},{key:'8',text:'1:40', value:'1:40'}, {key:'9',text:'1:50', value:'1:50'},{key:'10',text:'2:00', value:'2:00'},
      {key:'11',text:'2:10',value:'2:10'},{key:'12',text:'2:20', value:'2:20'},{key:'13',text:'2:30', value:'2:30'},{key:'14',text:'2:40', value:'2:40'}, {key:'15',text:'2:50', value:'2:50'},{key:'16',text:'3:00', value:'3:00'},
      {key:'17',text:'3:10',value:'3:10'},{key:'18',text:'3:20', value:'3:20'},{key:'19',text:'3:30', value:'3:30'},{key:'20',text:'3:40', value:'3:40'}, {key:'21',text:'3:50', value:'3:50'},{key:'22',text:'4:00', value:'4:00'},
      {key:'23',text:'4:10',value:'4:10'},{key:'24',text:'4:20', value:'4:20'},{key:'25',text:'4:30', value:'4:30'},{key:'26',text:'4:40', value:'4:40'}, {key:'27',text:'4:50', value:'4:50'},{key:'28',text:'5:00', value:'5:00'},
      {key:'29',text:'5:10',value:'5:10'},{key:'30',text:'5:20', value:'5:20'},{key:'31',text:'5:30', value:'5:30'},{key:'32',text:'5:40', value:'5:40'}, {key:'33',text:'5:50', value:'5:50'},{key:'34',text:'6:00', value:'6:00'},
      {key:'35',text:'6:10',value:'6:10'},{key:'36',text:'6:20', value:'6:20'},{key:'37',text:'6:30', value:'6:30'},{key:'38',text:'6:40', value:'6:40'}, {key:'39',text:'6:50', value:'6:50'},{key:'40',text:'7:00', value:'7:00'},
      {key:'41',text:'7:10',value:'7:10'},{key:'42',text:'7:20', value:'7:20'},{key:'43',text:'7:30', value:'7:30'},{key:'44',text:'7:40', value:'7:40'}, {key:'45',text:'7:50', value:'7:50'},{key:'46',text:'8:00', value:'8:00'},
      {key:'47',text:'8:10',value:'8:10'},{key:'48',text:'8:20', value:'8:20'},{key:'49',text:'8:30', value:'8:30'},{key:'50',text:'8:40', value:'8:40'}, {key:'51',text:'8:50', value:'8:50'},{key:'52',text:'9:00', value:'9:00'},
      {key:'53',text:'9:10',value:'9:10'},{key:'54',text:'9:20', value:'9:20'},{key:'55',text:'9:30', value:'9:30'},{key:'56',text:'9:40', value:'9:40'}, {key:'57',text:'9:50', value:'9:50'},{key:'58',text:'10:00', value:'10:00'}]

      const  values=[
        {key:'0',text:'',value:null},
        {key:'1',text:'1', value:1},
        {key:'2',text:'2', value:2},
        {key:'3',text:'3', value:3},
        {key:'4',text:'4', value:4},
        {key:'5',text:'5', value:5},
        {key:'6',text:'6', value:6},
        {key:'7',text:'7', value:7},
        {key:'8',text:'8', value:8},
        {key:'9',text:'9', value:9},
        {key:'10',text:'10', value:10},
        {key:'11',text:'11', value:11},
        {key:'12',text:'12', value:12},
        {key:'13',text:'13', value:13},
        {key:'14',text:'14', value:14},
        {key:'15',text:'15', value:15},
      ];
     
   
  
    const {invalid, submitting, pristine,event,cancelToggle,activeIndex1} = this.props;
    const {value}=this.state;
    //pristine is true after anything changes 
        return (
          <Grid>
       
           <Grid.Column >
              <Segment style={{margin:"1.5em 0"}}>
              {/* handleSubmit is redux form method */}
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Header sub color='teal'  content='Event detailes'/>
                  {/* <Field name='title' type='text' component={TextInput} placeholder='Givr your event a name'/> */}
                  <Field 
                    name="date"
                    type="text"
                    minDate={new Date()}
                    component={DateInput}
                    dateFormat='YYYY-MM-DD HH:mm'
                    timeFormat='HH:mm'
                    showTimeSelect
                    placeholder={`Date and time of start the irigation on Valve ${activeIndex1 !==3 ? activeIndex1 + 1 : "All Valves"}`}
                    onChange={this.handleChangeDate1}
                    />
                    <Field name='timeamount' 
                      type='text' 
                      options={timeValues}
                      component={SelectInput} 
                      placeholder='Please chose duration of irigation'/>
                    
                    <Field name='quantity'
                     type='text' component={TextInput} 
                     placeholder='Enter the amaount of water  in liters if you requierd'/>
                    <Field  name='value' 
                    value='true'
                    onChange={this.handleChange}
                    component={CheckboxInput}
                    type='checkbox' label={`Do you want to repeat the irrigation with Valave ${activeIndex1 !==3 ? activeIndex1 + 1 : "All Valves"} ?`}/>
                  { value &&  (<Field name='days' 
                      type='text' 
                      options={values}
                      // multiple={true}
                      component={SelectInput} 
                      placeholder='Please chose   days of repetition'/>)}
                    { value && (<Field name='amount' 
                      type='text' 
                      options={values}
                      // multiple={true}
                      component={SelectInput} 
                      placeholder='Please chose amount of repetitions'/>)}
                    <Field name='description' 
                    rows={3}
                    type='text'
                    component={TextArea}
                    placeholder='Insert some note if you reqiued  '/> 
                    <Button disabled={invalid || pristine || submitting} positive type="submit">
                      Submit
                     </Button>
                    <Button type="button" 
                    onClick={()=>this.props.history.push('/events')}>Cancel</Button>
                     <Button
                      onClick={() => cancelToggle(!event.cancelled, event.id)}
                      type='button'
                      color={event.cancelled ? 'green' : 'red'}
                      floated='right'
                      content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                       />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>           
        );
    }
}

const mapStateToProp=(state)=>{
 
  let event={};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return{
      initialValues:event,
      event:event,
      value:state.form.eventForm,
      activeIndex1:state.events.activeIndex
    //just  event
  }
}
const mapDispatchToProps={
  createEvent,
  updateEvent,
  cancelToggle,
  activeIndex
 
}
const isValidData = createValidator(
  message => value => {
    console.log(moment(value).toDate());
    if (!isAfter(moment(value).toDate(),new Date(Date.now()))) {
      return message
    }
  },
  'Invalid Data: Please select Future Event'
)


const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  quantity:isNumeric({message:'The amount of value shoul be a number'}),
  category: isRequired({message: 'Please provide a category'}),
  days:isRequired('days'),
  timeamount:isRequired({message:'Please Enter time of irigation'}),
  amount:isRequired('amount'),
  date1:composeValidators(
  isRequired({message:'Please enter the start of irigation'}),
  isValidData
  )()
}); 



export default withRouter(withFirestore (connect(mapStateToProp,mapDispatchToProps)(reduxForm({form: `eventForm`,enableReinitialize:true,validate})(EventForm1))));