const TextReplacer = require('../models/misc/TextReplacer');
const { decoded } = require('./decodedJWT');

exports.textReplacer = async (text) => {
  id = decoded();
  const data = await TextReplacer.findOne({ _id: id });
  if (!data) {
    return { msg: 'no text replacers' };
  }
  find = data.text;
  restore = data.restore;
  final = text;

  for (let i = find.length - 1; i >= 0; i--) {
    final = final.replace(
      RegExp(
        '\\b' + find[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b',
        'g'
      ),
      restore[i]
    );
  }

  return final;
};
