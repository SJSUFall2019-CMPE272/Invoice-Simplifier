from spellchecker import SpellChecker

spell = SpellChecker()
# find those words that may be misspelled
misspelled = spell.unknown(['1023456789-0ENERGY'])
for word in misspelled:
    print(spell.correction(word))
