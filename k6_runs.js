import testSuiteScenarioUser from "./Scenario/user/user_index.js"

import { group, sleep } from "k6";

export default () =>{

    group('API /User/', () => {
        testSuiteScenarioUser()
        sleep(3)
    });


}