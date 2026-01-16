'use strict'
// 1行目に記載している 'use strict' は削除しないでください

function test(actual, expected) {
  if (_.isEqual(actual, expected)) {
    console.log("OK! Test PASSED.");
  } else {
    console.error("Test FAILED. Try again!");
    console.log("    actual: ", actual);
    console.log("  expected: ", expected);
    console.trace();
  }
}
