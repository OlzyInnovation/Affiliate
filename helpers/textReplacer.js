const TextReplacer = require('../models/misc/TextReplacer');

exports.textReplacer = async (text, id) => {
  const data = await TextReplacer.find();
  if (!data) return;
  filtered = data.map(({ replacement }) => {
    if (replacement && replacement[0]._id == id) return replacement;
  });
  try {
    find = filtered.text;
    restore = filtered.restore;
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
