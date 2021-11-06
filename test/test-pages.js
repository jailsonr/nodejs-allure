var userTest = require('./lib/subject/suites/user.test');

describe('Acceptance Test', async function(){
    
    describe('Test Case - Users', userTest.bind(this));
 
});