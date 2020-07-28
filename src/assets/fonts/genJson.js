const path = require('path');
const fs = require('fs');

const jsonPath = path.resolve(__dirname, 'iconfont.json');

const str = fs.readFileSync(jsonPath).toString();

const json = JSON.parse(str);
const result = {};
for (let item of json.glyphs) {
  result[item.font_class] = item.unicode_decimal;
}
fs.writeFileSync(jsonPath, JSON.stringify(result));
