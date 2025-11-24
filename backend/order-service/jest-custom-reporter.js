class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    const { numFailedTestSuites, numPassedTestSuites, numTotalTestSuites } = results;
    const { numFailedTests, numPassedTests, numTotalTests } = results;
    const { startTime } = results;
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(3);

    console.log('\n');
    console.log(`Test Suites: ${numFailedTestSuites > 0 ? `${numFailedTestSuites} failed, ` : ''}${numPassedTestSuites} passed, ${numTotalTestSuites} total`);
    console.log(`Tests:       ${numFailedTests > 0 ? `${numFailedTests} failed, ` : ''}${numPassedTests} passed, ${numTotalTests} total`);
    console.log(`Snapshots:   ${results.snapshot.total} total`);
    console.log(`Time:        ${duration} s`);

    // Chỉ hiển thị failed tests nếu có
    if (numFailedTests > 0) {
      console.log('\nFailed Tests:');
      results.testResults.forEach((testResult) => {
        const failedTests = testResult.testResults.filter((test) => test.status === 'failed');
        
        if (failedTests.length > 0) {
          // Chỉ lấy tên file, không lấy full path
          const fileName = testResult.testFilePath.split(/[\\\/]/).pop();
          console.log(`\nFAIL | ${fileName}`);
          failedTests.forEach((test) => {
            // Chỉ hiển thị tên test case
            console.log(`  ✕ ${test.title} (${test.duration} ms)`);
          });
        }
      });
    }
  }
}

module.exports = CustomReporter;
