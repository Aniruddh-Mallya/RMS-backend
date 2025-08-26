const { scan } = require('sonarqube-scanner');

scan({
  serverUrl: 'http://localhost:9000',  // Or your SonarCloud URL
  token: 'sqp_e906b069959c000199af56e968451c4c828f392c',                 // Authentication token
  options: {
    'sonar.projectKey': 'RMS',
    'sonar.projectName': 'rms',
    'sonar.projectVersion': '1.0.0',
    //'sonar.sources': 'src',
    //'sonar.tests': 'test',
    //'sonar.test.inclusions': '**/*.test.js,**/*.spec.js',
    //'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info', // If you have test coverage
    'sonar.sourceEncoding': 'UTF-8'
  }
});