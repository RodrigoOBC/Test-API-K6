import { describe, expect, chai } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import { sleep } from "k6";
let sessionAuth = new Httpx({baseURL: 'http://localhost:8080/castlemock/mock/rest/project/zzOF2A/application/tJlrkI'});
let response =  ''

export let options = {
    thresholds: {
      // fail the test if any checks fail or any requests fail
      checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
      http_req_failed: [{ threshold: 'rate == 0.00', abortOnFail: true }],
    },
    vus: 1,
    iterations: 1,
  };

const env = JSON.parse(open('../../.env.json'))

export default function scenarioAuthBarear(){

    const params = { headers: { "Authorization": 'Bearer '+env.TOKEN } };
  

    return params

}

