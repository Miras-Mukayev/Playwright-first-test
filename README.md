[![Playwright Tests](https://github.com/Miras-Mukayev/Playwright-first-test/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Miras-Mukayev/Playwright-first-test/actions/workflows/playwright.yml)

CI system: GitHub Actions. I chose it because it is integrated with GitHub and runs tests automatically on pushes and pull requests.

The workflow is located in `.github/workflows/playwright.yml`
It installs dependencies and Chromium, runs tests using 4 shards, checking the tests and creates/merges test reports
The reports are merged into HTML and JUnit formats, being store for 14 days

To run:

npm ci
npx playwright install chromium
npx playwright test

Performance

1 shard (baseline): 1m 12s
4 shards: 1m 01s 

The four-shard run was 11 seconds faster (about 15.3%). Both runs passed all tests. Therefore, parallel running provided better performance for tests set.

https://github.com/Miras-Mukayev/Playwright-first-test/actions/runs/45167425273  (4 shards)
https://github.com/Miras-Mukayev/Playwright-first-test/actions/runs/45182088040  (baseline/1)


AI was used to help with tests debugging and verification, also to initialize CI configuration