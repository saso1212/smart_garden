import React from 'react';
//index.css is stylig from this page

const HomePage = (props) => {
    return (
       <div>
             <div className="ui inverted vertical masthead center aligned segment">
               <div className="ui text container">
                 <h1 className="ui inverted stackable header">
                   <img
                     className="ui image massive garden"
                     src="/assets/garden.png"
                     alt="logo"
                   />
                   <div className="content">SMART GARDEN</div>
                 </h1>
                 <h2>CONTROL YOU GARDEN</h2>
                 <div onClick={()=>props.history.push('/events')} className="ui huge white inverted button">
                   Get Started
                   <i className="right arrow icon" />
                 </div>
               </div>
             </div>
           </div>
    );
};

export default HomePage;