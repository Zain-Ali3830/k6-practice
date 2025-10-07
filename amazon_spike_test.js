import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
  stages: [
    { duration: "10s", target: 5 }, 
    { duration: "5s", target: 200 }, 
    { duration: "30s", target: 200 }, 
    { duration: "10s", target: 5 }, 
    { duration: "10s", target: 0 }, 
  ],
};

export default function () {
  const res = http.get("https://www.amazon.com/s?k=laptop");

  sleep(1);
}

// Generates an HTML report after the test run
export function handleSummary(data) {
  return {
    'amazon_spike_test_report.html': htmlReport(data),
  };
}