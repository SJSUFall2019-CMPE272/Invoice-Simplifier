from spellchecker import SpellChecker

spell = SpellChecker()
# find those words that may be misspelled
misspelled = spell.unknown(['statment',  'is', 'wrong'])
for word in misspelled:
    print(spell.correction(word))
