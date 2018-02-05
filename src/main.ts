// import our styles
import './index.css';

// import mini framework and its configure function
import { configure, MF } from 'mframejs';


// get our app class, every app needs to start somewhere
import { App } from './app';


// wait for DOM to be loaded

// configure it by setting where and our main class
configure(App).then((mf: MF) => {

    // register our elements/attributes
    // mf.register(component, attribute);

    // start it
    mf.start(document.body);
});



