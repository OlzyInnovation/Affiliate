const TextReplacer = require('../models/misc/TextReplacer');

exports.textReplacer = async (text, id) => {
  const data = await TextReplacer.findOne({ id });
  if (!data) return;
  try {
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
  } catch (err) {
    console.log(err);
  }
};
