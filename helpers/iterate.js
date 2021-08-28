exports.iterate = async (text) => {
  final = text;
  for (let i = final.length - 1; i >= 0; i--) {
    final = final.replace(
      RegExp(
        '\\b' + find[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b',
        'g'
      ),
      restore[i]
    );
  }
};
