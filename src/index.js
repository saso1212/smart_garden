import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {configureStore} from './app/store/configureStore';
import ScrollToTop from './app/common/utility/scrollToTop';


const store=configureStore();


const rootEl=document.getElementById('root');

let render=()=>{
    ReactDOM.render(
      
         <Provider store={store}>
           <BrowserRouter>
            <ScrollToTop>
                <ReduxToastr
                    position='bottom-right'
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'
                />
                <App/>
            </ScrollToTop> 
           </BrowserRouter>
         </Provider>
           ,rootEl)
}

if (module.hot){
    module.hot.accept('./app/layout/App',()=>{
        setTimeout(render)
    })
}
//our render method will commit after autentication is been done and this si done by seting  firebas and firestore
store.firebaseAuthIsReady.then(()=>{
    render();
})

serviceWorker.unregister();
