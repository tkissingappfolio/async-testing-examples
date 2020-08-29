'use strict';

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
  diff: true,
  extension: ['js', 'ts'],
  // file: './app/javascript/mccportal/test/helper.js',
  package: './package.json',
  r: [
    'esm',

    // 'ts-node/register',
    '@babel/register',
    'jsdom-global/register',
    // 'ignore-styles'
  ],
  recursive: true,
  reporter: 'spec',
  reporterOption: [
    'mochaFile=./test_reports/test-results.xml'
  ],
  slow: 75,
  timeout: 2000,
  ui: 'bdd'
};