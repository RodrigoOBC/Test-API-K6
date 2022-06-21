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
  
  const params = scenarioAuthBarear()
  let session = new Httpx({baseURL: 'https://gorest.co.in/public/v2/'});
  let response =  ''
  



  function scenario1(id){
    
    describe(`When I do request for endpoint user with - SucessFull` , () => {
        session.addHeader('Authorization', params.headers.Authorization);
        response = session.get(`users/?id=${id}`);
        
        describe(`Then I validate response`, () => {
          expect(response.status, 'Response is 200').to.equal(200)
          expect(response, 'check json response').to.have.validJsonBody()
          expect(response.json()[0], 'validate response keys').to.include.keys('id', 'name', 'email', 'gender','status');
        
        })
    })

}


export default function testSuiteScenario2() {
    scenario1(5648);
    sleep(3)
  }
