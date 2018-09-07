import { configure, MF } from 'mframejs';

import { App } from './app';
configure(App).then((mf: MF) => {
    mf.start(document.body);
});

console.log('build-07.09.2018-v2');



