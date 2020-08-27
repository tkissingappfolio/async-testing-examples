# async-testing-examples

Use `npm test` to run all the specs or `npm test <relative path to file>` to run a specific test file only.

You can also filter by the `it()` description of a test using e.g. `npm test -- -g "inside .then"` to run a specific test only.
Don't forget the `--`, otherwise npm will "eat" the `-g` and you will see `Error: No test files found: ...`