module.exports = {
  fix: function(text) {
    var fixedText = text
    for (var k = 0; k < 100; k++) {
      fixedText = fixedText.replace("&nbsp;", " ")
      fixedText = fixedText.replace("&rsquo;", "'")
      fixedText = fixedText.replace("&euro;", "€")
      fixedText = fixedText.replace("&rdquo;", "\"")
      fixedText = fixedText.replace("&ldquo;", "\"")
      fixedText = fixedText.replace("&agrave; ", "à")
      fixedText = fixedText.replace("&egrave; ", "è")
      fixedText = fixedText.replace("&igrave; ", "ì")
      fixedText = fixedText.replace("&ograve; ", "ò")
      fixedText = fixedText.replace("&ugrave; ", "ù")
    }
    return fixedText
  }
}