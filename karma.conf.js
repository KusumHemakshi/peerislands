// Karma configuration file
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: true,
        seed: '4321',
        oneFailurePerSpec: true,
        failFast: true,
        timeoutInterval: 10000,
      },
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/peerislands'),
      subdir: '.',
      reporters: [
        { type: 'html', dir: 'coverage/html' },
        { type: 'text-summary' },
        { type: 'lcov', dir: 'coverage/lcov' },
        { type: 'json', dir: 'coverage/json' },
        { type: 'cobertura', dir: 'coverage/cobertura' },
      ],
      fixWebpackSourcePaths: true,
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
      watermarks: {
        statements: [50, 75],
        functions: [50, 75],
        branches: [50, 75],
        lines: [50, 75],
      },
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    failOnEmptyTestSuite: false,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
  });
};
