const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/studio-locales.js'), 'utf8'), context);
const data = context.window.LiteStudioLocales;

test('all supported languages have labels, direction and locale codes', () => {
  assert.deepEqual(Array.from(data.LANGUAGE_OPTIONS, item => item.id), ['fr','en','es','de','ar']);
  for (const {id} of data.LANGUAGE_OPTIONS) {
    assert.ok(data.LOCALES[id].documentTitle);
    assert.ok(data.LOCALES[id].menu);
    assert.ok(data.LOCALE_CODES[id]);
    assert.equal(data.LOCALES[id].dir, id === 'ar' ? 'rtl' : 'ltr');
  }
});

test('UI messages are present in each language', () => {
  for (const {id} of data.LANGUAGE_OPTIONS) {
    for (const key of Object.keys(data.UI_COPY.fr)) {
      assert.equal(typeof data.UI_COPY[id][key], 'string', `${id}.${key}`);
      assert.ok(data.UI_COPY[id][key].length > 0, `${id}.${key}`);
    }
  }
});

test('application loads locale data before its controller', () => {
  const html = fs.readFileSync(path.join(root, 'app.html'), 'utf8');
  const locale = html.indexOf('src="js/studio-locales.js"');
  const app = html.indexOf('src="js/simple-studio.js"');
  assert.ok(locale >= 0 && app > locale);
  assert.ok(Object.isFrozen(data));
});
