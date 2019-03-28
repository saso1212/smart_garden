import moment from 'moment'

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate();
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || '/assets/user.png',
    created: Date.now()
  }
}
export const calculateDate=(date, timeAmount)=>{
  const dateToMills=date.toDate().getTime();
  const timeSetup=timeAmount.split(":");
  const hours=timeSetup[0] * 3600000;
  const minutes=timeSetup[1] * 60000;
  const newDate=dateToMills + hours + minutes;
  return new Date(newDate);
}