import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import cuid from 'cuid'
import firebase from '../../config/firebase'
//import { FATCH_EVENTS } from '../events/eventConstatnts'
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions'

//we use firebase so we dont need reducer and constsnt

export const updateProfile=(user)=>{
 return async (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        const {isEmpty,isLoaded,providerData, ...updatedUser}=user;
            //we must convert user.dateOfBirth in to Javascrip object so we can pass into firebase
            if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
                updatedUser.dateOfBirth=moment(updatedUser.dateOfBirth).toDate();
            }
        try{
            //this will update firestore user profile-- litlle bit strange but thi is only in this scenarioo
            await firebase.updateProfile(updatedUser);
            toastr.success('Success','Profile Update')
           
        }
        catch(error){
            console.log(error)
        }
    }
}
export const deletePhoto=(photo)=>{
    //we will need to delete photo into firebaseColection and in to firestore
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        const user=firebase.auth().currentUser;
        try{
           await firebase.deleteFile(`${user.uid}/userImages/${photo.name}`);
            await firestore.delete({
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos',doc:photo.id}]
            })
        }
        catch(error){
            dispatch(asyncActionError());
            console.log(error);
            throw new Error('Problem with delete photo')
        }
    }
}



export const setMainPhoto=photo=>{
    return async (dispatch,getState)=>{
    //    before duplicate data insert
    //     const firebase=getFirebase();
    //     try{
    //         dispatch(asyncActionStart());
    //         await firebase.updateProfile({
    //             photoURL:photo.url
    //         })
    //         dispatch(asyncActionFinish())
    //     }
    //     catch(error){
    //         console.log(error);
    //         dispatch(asyncActionError())
    //         throw new Error('Propblem with set main photo')
    //     }
     dispatch(asyncActionStart());
     //go to firestore thrue the API
      const firestore = firebase.firestore();
      const user = firebase.auth().currentUser;
      const today = new Date(Date.now());
      let userDocRef = firestore.collection('users').doc(user.uid);
      console.log('userDocRef',userDocRef)
      //we need eventAttendeeRef to establish witch events the user is  attending
      let eventAttendeeRef = firestore.collection('event_attendee');
      console.log('eventAttendeeRef',eventAttendeeRef);
      try {
        let batch = firestore.batch();
        await batch.update(userDocRef, {
          photoURL: photo.url
        });
        //take only the futures events for update fot this user 
        let eventQuery = await eventAttendeeRef.where('userUid', '==', user.uid).where('eventDate', '>', today);
        console.log('eventQuery',eventQuery)
        let eventQuerySnap = await eventQuery.get();
        console.log('eventQuerySnap',eventQuerySnap)
        for (let i=0; i<eventQuerySnap.docs.length; i++) {
          //update data inside the event collection
          //first take the document win event with eventId that we have inside event_attendee
          let eventDocRef = await firestore.collection('events').doc(eventQuerySnap.docs[i].data().eventId)
          let event = await eventDocRef.get();
          console.log(event);
          if (event.data().hostUid === user.uid) {
            //if the user is Hositng
            batch.update(eventDocRef, {
              hostPhotoURL: photo.url,
              [`attendees.${user.uid}.photoURL`]: photo.url
            })
          } else {
            batch.update(eventDocRef, {
              [`attendees.${user.uid}.photoURL`]: photo.url
            })
          }
        }
        console.log(batch);
        await batch.commit();
        dispatch(asyncActionFinish())
      } catch (error) {
        console.log(error);
        dispatch(asyncActionError())
        throw new Error('Problem setting main photo');
      }
        }
}

export const uploadProfileImage=(file,fileName)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const imageName=cuid();
        const firebase=getFirebase();
        const firestore=getFirestore();
        const user=firebase.auth().currentUser;
        const path=`${user.uid}/userImages`;
        const options={
            name:imageName
        }
        try{
            dispatch(asyncActionStart());
            //upload file to firebase storage
            //path is the pathe where wi will upoad file,file is the file that we upload,
            // null is beacuse we will use firestore not the real firebase database and handle that file manualu,
            //options will be the name of the file
            let uploadFile= await firebase.uploadFile(path,file,null,options);
            console.log(uploadFile);
             //get the url of the image from what we get return from firebase storage
            let downloadURL =await uploadFile.uploadTaskSnapshot.downloadURL;
            //get userdoc
            //get document from firestore
            //if we want to aces to document in firestore we must use data() method
            let userDoc= await firestore.get(`users/${user.uid}`)
             //check if the user has photo, if not update profile with the image
            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL:downloadURL
                })
                await user.updateProfile({
                    photoURL:downloadURL
                }) 
            }
            //add the photo to photo collection
            await firestore.add({
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos'}]
            },
            //specifie the document we want to add
            {
                name:imageName,
                url:downloadURL
            })
            dispatch(asyncActionFinish())

        }catch(error){
            dispatch(asyncActionError())
            console.log(error)
            throw new Error('Problem uploading photo')
        }


    }
}