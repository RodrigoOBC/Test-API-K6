import testSuiteScenario1 from "./PostUsers.js";
import testSuiteScenario2 from "./GetUsers.js";
import { group, sleep } from "k6";


function UserScenario () {
    group('Post  /Users', () => {
        testSuiteScenario1()
        sleep(3)
    });

    group('Get  /Users/{id}', () => {
        testSuiteScenario2()
        sleep(3)
    });
}

   


export default function testSuiteScenarioUser() {
    UserScenario()
  }