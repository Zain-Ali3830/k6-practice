// test1-simple.js
import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// export default function () {
//   // Make a GET request to the homepage
//   http.get('https://test.k6.io');

//   // Wait 1 second (simulates user reading)
//   sleep(1);
// }





// export const options = {
//   vus: 1000, // 50 virtual users
//   duration: '10s', // Run for 30 seconds
// };

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }






export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests under 500ms
    'http_req_failed': ['rate<0.01'],   // Less than 1% errors
  },
};




export default function () {
  const res = http.get('https://test.k6.io');

  // Check if the response is valid
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 500,
  });
}

// Generates an HTML report after the test run
export function handleSummary(data) {
  return {
    'load_test_report.html': htmlReport(data),
  };
}
