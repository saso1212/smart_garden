import * as actionTypes from './eventConstatnts';
//import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions';
import {toastr} from 'react-redux-toastr'
import moment from 'moment'
import { createNewEvent,calculateDate } from '../../common/utility/helpers'


export const createEvent = (event,index) => {
 
  return async (dispatch, getState, { getFirestore,getFirebase }) => {
    const firestore = getFirestore();
    // const firebase=getFirebase();
    // in the new versinon of firebase there in no posebility to take user with firestore 
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL || '/assets/user.png' ;
    let dateEnd = calculateDate(event.date,event.timeamount);
    // console.log("event date",dateEnd);
    if(index !== 3){
    let newEvent =await createNewEvent(user, photoURL, event);
    console.log('newEvenet',newEvent);
   let dateInMils=newEvent.date.getTime();
   let dateEndInMils=dateEnd.getTime();
   
  
    // const dateEnd = await calculateDate(event.date,event.timeamount);
    // console.log(dateEnd);
  //  console.log('event is',calculateDate(event.date,event.timeamount))
    let additionalEvent={
      ...newEvent,
     eventEndAt:dateEnd,
     eventStartAt:dateInMils,
     eventEndInMils:dateEndInMils,
     name:`valve_${index+1}`
    }
    try {
      let createdEvent = await firestore.add(`events`, additionalEvent);
      //we have alredy created id with add function so we can use it
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        eventEndAt:dateEnd,
        host: true,
        name:`valve_${index+1}`
      });
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }}
    else{
      for (let i=0; i<index; i++){
        let newEvent =await createNewEvent(user, photoURL, event);
        console.log('newEvenet',newEvent);
       let dateInMils=newEvent.date.getTime();
       let dateEndInMils=dateEnd.getTime();
       let additionalEvent={
          ...newEvent,
         eventEndAt:dateEnd,
         eventStartAt:dateInMils,
         eventEndInMils:dateEndInMils,
         name:`valve_${i+1}`
        }
        try {
          let createdEvent = await firestore.add(`events`, additionalEvent);
          //we have alredy created id with add function so we can use it
          await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
            eventId: createdEvent.id,
            userUid: user.uid,
            eventDate: event.date,
            eventEndAt:dateEnd,
            host: true,
            name:`valve_${i+1}`
          });
          toastr.success('Success', 'Event has been created');
        } catch (error) {
          toastr.error('Oops', 'Something went wrong');
        }
      }
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    //we must check if the date is diferent from the existing date because in the date componet it will hapend 
    //some invalide data... we must do this
    if (event.date !== getState().firestore.ordered.events[0].date) {
      //we do moment function this because firestore will complain with the date
      event.date = moment(event.date).toDate();
    }
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success', 'Event has been updated');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

//cancelled will be true or false
export const cancelToggle = (cancelled, eventId) =>
 async (dispatch,getState,{ getFirestore }) => {
  const firestore = getFirestore();
  //if true?  :  
  const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This reactivate the event - are you sure?';
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          //if there is no cancalled it will cretaed   in firesbase 
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const activeIndex=(data)=>{
  return{
    type:actionTypes.CREATE_ACTIVEINDEX,
    payload:data
  }
}

// export const deleteEvent=(eventId)=>{
//     return{
//       type:actionTypes.DELETE_EVENT,
//       payload:{
//           eventId
//       }
//     }
//  }

//  export const fatchEvents=(events)=>{
//    return {
//      type:actionTypes.FATCH_EVENTS,
//      payload:events
//       }
//  }



//  export const loadEvents=()=>{
//    return async dispatch=>{
//      try {
//       dispatch(asyncActionStart())
//       let events= await fatchSampleData();
//       dispatch(fatchEvents(events));
//       dispatch(asyncActionFinish())
//      }
//      catch (error){
//        console.log(error);
//        dispatch(asyncActionError());
//      }
//    }
//  }

 