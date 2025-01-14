function truncateText(text) {
  const maxLength = 150;

  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
}
module.exports = {
  truncateText,
};
