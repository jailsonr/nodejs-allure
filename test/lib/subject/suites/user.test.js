var expect = require('chai').expect;
require('chai').should;
var chai = require('chai');
var chaiHttp = require('chai-http');
let User = require('../../../../model/User');

require('mocha-allure-reporter');

function suite(){    
    var user;
    var url;

    before(function(){
        chai.use(chaiHttp)
        url = 'http://localhost:8080';
        user = new User('John',  'Another random city', '+56 9 93871034');
    });

    const getUser = allure.createStep("Step 1 - Search for users", async (done) => {

        chai.request(url).get('/users').then(res =>{
            expect(res.status).to.equal(200);
            done();
            })
            .catch(err =>{
                done(err);
                throwError(err);
            });
    });

    const addUserSuccessfully = allure.createStep("Step 2 - Add user successfully", async (done) => {

            chai.request(url).post('/users',  user).then(res =>{
                expect(res.status).to.equal(200);
                done();
                })
                .catch(err =>{
                    done(err);
                    throwError(err);
                });

    });

    const addUserWithFail = allure.createStep("Step 3 - Validate previous added user",  async (done) => {
        chai.request(url).post('/users',  user).then(res =>{
            expect(res.status).to.equal(200);
            done();
            })
            .catch(err =>{
                done(err);
                throwError(err);
            });
    });

    const throwError = allure.createStep("Error details", (err) => {
        console.log('Error is this:' + err);
        throw new Error(err);
      });

    it('Search for users', function(done)
    {
       getUser(done);
    });
    
    it('Add user successfully', function(done)
    {
        addUserSuccessfully(done);       
    });

    it('Validate previous added user', function(done)
    {
        addUserWithFail(done);
    });

}

module.exports = suite;