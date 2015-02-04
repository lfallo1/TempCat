var tests = [],
    testFileRegExp = /Test\.js$/i,
    file;

for(file in window.__karma__.files){
    if(window.__karma__.files.hasOwnProperty(file)){
        if(testFileRegExp.test(file)) {
            tests.push(file);
        }
    }
}

console.log(tests.length+" files to be tested.");

requirejs.config({
    baseUrl: '/base/CATEXPENSEFRONT/',
    shim:{
        'knockout-2.3.0': {
            exports: 'ko'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});