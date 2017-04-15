
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />


import {assert} from 'chai';
import File = require('vinyl');
import * as path from 'path';

import {PolymerProject} from '../polymer-project';

const testProjectRoot =
    path.resolve('test-fixtures/custom-elements-es5-adapter');

suite('Custom Elements ES5 Adapter', () => {

  let defaultProject: PolymerProject;

  const unroot = ((p: string) => p.substring(testProjectRoot.length + 1));

  setup(() => {
    defaultProject = new PolymerProject({
      root: 'test-fixtures/custom-elements-es5-adapter/',
      entrypoint: 'index.html',
      shell: 'shell.html',
      sources: [
        'source-dir/**',
      ],
    });
  });

  test('injects the custom elements es5 adapter in index', (done) => {
    const injectedAdapter = '<div id="autogenerated-ce-es5-shim">';
    const files = new Map();
    defaultProject.sources()
        .pipe(defaultProject.addCustomElementsEs5Adapter())
        .on('data', (f: File) => files.set(unroot(f.path), f))
        .on('data', () => {/* starts the stream */})
        .on('end', () => {
          const expectedFiles = [
            'index.html',
            'shell.html',
          ];
          assert.deepEqual(Array.from(files.keys()).sort(), expectedFiles);
          const index = files.get('index.html').contents.toString();
          const shell = files.get('shell.html').contents.toString();
          assert.include(index, injectedAdapter);
          assert.notInclude(shell, injectedAdapter);
          assert.notInclude(index, '<html', 'html element was added');
          assert.notInclude(index, '<head', 'head element was added');

          // The following assertions demonstrate that `<body` does not
          // appears in the file, except in the case where it is part of
          // the string `<body> so that` which appears in a comment in
          // the adapter shim.
          assert.notMatch(
              index, /<body(?!> so that)/, 'body element was added');
          assert.include(index, '<body> so that');
          done();
        });
  });
});
