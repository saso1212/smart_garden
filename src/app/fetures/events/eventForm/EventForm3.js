// /*global google */
import React, { Component } from 'react';
import {Segment,Form,Button,Grid,Header} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';
// import {composeValidators,combineValidators,isRequired,hasLengthGreaterThan,isNumeric} from 'revalidate';
import {combineValidators,isRequired,isNumeric} from 'revalidate';
//import Script from 'react-load-script';
//import {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import {createEvent,updateEvent} from '../eventActions';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';
import DateInput from '../../../common/form/DateInput';
import CheckboxInput from '../../../common/form/CheckboxInput'
//import PlaceInput from '../../../common/form/PlaceInput';
import { cancelToggle} from '../eventActions'
import {connect} from 'react-redux';
import moment from 'moment'
import isBefore from 'date-fns/is_before'
import { withFirestore } from 'react-redux-firebase';
// import cuid from 'cuid';


class EventForm3 extends Component {
  state={
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false,
    value:false,
    changeDate1:false,
    date1:null,
    isValide:false
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
      values.venueLatLng=this.state.venueLatLng;
      console.log(values);
      console.log('initial values',this.props.initialValues.id);
       if (this.props.initialValues.id)
        { 
          if (Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = this.props.event.venueLatLng
        }
          this.props.updateEvent(values);
          this.props.history.goBack();
       }
        else
        {
          this.props.createEvent(values)};
          this.props.history.push('/events');
    }
    handleChange = (e, { value }) => this.setState((prevState)=>{
      return{value:!prevState.value}
    })
    handleChangeDate1=(e,val)=>{
      return this.setState({
      changeDate1:true,date1:moment(val).toDate()}
    )}
    handleChageDate2=(e,val)=>{
       return  this.setState({isValide:isBefore(this.state.date1,moment(val).toDate())});
    }
   
   
    render() {

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
     
    //   const category = [
    //     {key: 'drinks', text: 'Drinks', value: 'drinks'},
    //     {key: 'culture', text: 'Culture', value: 'culture'},
    //     {key: 'film', text: 'Film', value: 'film'},
    //     {key: 'food', text: 'Food', value: 'food'},
    //     {key: 'music', text: 'Music', value: 'music'},
    //     {key: 'travel', text: 'Travel', value: 'travel'},
    // ];
  
    const {invalid, submitting, pristine,event,cancelToggle} = this.props;
    const {value,changeDate1}=this.state;
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
                    name="date1"
                    type="text"
                    component={DateInput}
                    dateFormat='YYYY-MM-DD HH:mm'
                    timeFormat='HH:mm'
                    showTimeSelect
                    placeholder="Date and time of start the irigation for Valve 3 "
                    onChange={this.handleChangeDate1}
                    />
                    <Field 
                    name="date2"
                    type="text"
                    disabled={!changeDate1}
                    component={DateInput}
                     dateFormat='YYYY-MM-DD HH:mm'
                    timeFormat='HH:mm'
                    showTimeSelect
                    placeholder="Date and time of end the irigation for Valve 3 "
                    onChange={this.handleChageDate2}
                    />
                    <Field name='quantity'
                     type='text' component={TextInput} 
                     placeholder='Enter the amaount of water in liters if you requierd'/>
                    <Field  name='value' 
                    value='true'
                    onChange={this.handleChange}
                     component={CheckboxInput}
                    type='checkbox' label='Do you want to repeat the irrigation with  Valve 3 ?'/>
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
                    placeholder='Insert some note if you need'/> 
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
      value:state.form.eventForm 
      //just  event
  }
}
const mapDispatchToProps={
  createEvent,
  updateEvent,
  cancelToggle
}
const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  quantity:isNumeric({message:'The amount of value shoul be a number'}),
  category: isRequired({message: 'Please provide a category'}),
  // description: composeValidators(
  //   isRequired({message: 'Please enter a description'}),
  //   hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  // )(),
  // city: isRequired('city'),
  //will put default validation message
  venue: isRequired('venue'),
  days:isRequired('days'),
  amount:isRequired('amount'),
  date1: isRequired({message:'Please enter the start of irigation'}),
  date2: isRequired({message:'Please enter the end of irigation'})
}); 



export default withFirestore (connect(mapStateToProp,mapDispatchToProps)(reduxForm({form: 'eventForm3',enableReinitialize:true,validate})(EventForm3)));