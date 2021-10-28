import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const resultingString = '{\n- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

const pathOne = 

test('get difference between two plain JSON', () => {
    expect(genDiff(pathOne, pathTwo))

});