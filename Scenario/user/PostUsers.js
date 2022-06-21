import { describe, expect, chai } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import { sleep } from "k6";
import scenarioAuthBarear from "../utils/scenarioAuthSample.js"

chai.config.logFailures = true;

export let options = {
    thresholds: {
      // fail the test if any checks fail or any requests fail
      checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
      http_req_failed: [{ threshold: 'rate == 0.00', abortOnFail: true }],
    },
    vus: 1,
    iterations: 1,
  };
  

  let session = new Httpx({baseURL: 'https://gorest.co.in/public/v2/'});
  let response =  ''
  let randomInt = Math.floor(Math.random() * 1000000);
  let email =  `rodrigo.Cabral+${randomInt}@test.test`
  let request =  JSON.parse(open('resources/create_user.json'))
  request.email = email
  const params = scenarioAuthBarear()  


  function scenario1(){

    describe(`When I create new user - SucessFull` , () => {

        response = session.post('users',request,params);
        describe(`Then the response should be valid `, () => {
            expect(response.status, 'Response is 200').to.equal(201)
            expect(response, 'check json response').to.have.validJsonBody()
            expect(response.json(), 'validate response keys').to.include.keys('id', 'name', 'email', 'gender','status');
        
        })
    })

  }


  function scenario2(){

    describe(`When I create new user without auth - Fail` , () => {

        response = session.post('users',request);
        describe(`Then I validate response`, () => {
            expect(response.status, 'Response is 401').to.equal(401)
            expect(JSON.parse(response.body).message, 'Message is "Authentication failed"').to.equal("Authentication failed")
            expect(response, 'check json response').to.have.validJsonBody()
            expect(response.json(), 'validate response keys').to.include.keys('message');
        
        })
    })

  }
  

  export default function testSuiteScenario1() {
    scenario1()
    sleep(3)
    scenario2()
  }