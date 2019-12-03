import PyPDF2
import textract
import docx
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
from pdf2image import convert_from_path, convert_from_bytes
from pdf2image.exceptions import (
    PDFInfoNotInstalledError,
    PDFPageCountError,
    PDFSyntaxError
)
from PIL import Image

nltk.download('punkt')
nltk.download('stopwords')

# write a for-loop to open many files
filename = 'Sample PDFs/sample1.pdf'











# open allows you to read the file
pdfFileObj = open(filename, 'rb')
# The pdfReader variable is a readable object that will be parsed
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
# discerning the number of pages will allow us to parse through all #the pages
num_pages = pdfReader.numPages
count = 0
text = ""
# The while loop will read each page
while count < num_pages:
    pageObj = pdfReader.getPage(count)
    count += 1
    text += pageObj.extractText()
# This if statement exists to check if the above library returned #words. It's done because PyPDF2 cannot read scanned files.
if text != "":
    text = text
# If the above returns as False, we run the OCR library textract to #convert scanned/image based PDF files into text
else:
    text = textract.process(filename, method='tesseract', language='eng')
# Now we have a text variable which contains all the text derived #from our PDF file. Type print(text) to see what it contains. It #likely contains a lot of spaces, possibly junk such as '\n' etc.
# Now, we will clean our text variable, and return it as a list of keywords.


tokens = word_tokenize(text)
# we'll create a new list which contains punctuation we wish to clean
punctuations = ['(', ')', ';', ':', '[', ']', ',']
# We initialize the stopwords variable which is a list of words like #"The", "I", "and", etc. that don't hold much value as keywords
stop_words = stopwords.words('english')
# We create a list comprehension which only returns a list of words #that are NOT IN stop_words and NOT IN punctuations.
keywords = [word for word in tokens if not word in stop_words and not word in punctuations]

for i in range(0, len(keywords)):
    if keywords[i] == "Total" and keywords[i + 1] == "Amount" and keywords[i + 2] == "Due":
        text = keywords[i] + " " + keywords[i + 1] + " " + keywords[i + 2] + " " \
               + keywords[i + 5]
        break

print(text)

for i in range(0, len(keywords)):
    if keywords[i] == "Account" and keywords[i + 1] == "No":
        text = keywords[i] + " " + keywords[i + 1] + " " + keywords[i + 2]
        break

print(text)

for i in range(0, len(keywords)):
    if keywords[i] == "Statement" and keywords[i + 1] == "Date":
        text = keywords[i] + " " + keywords[i + 1] + " " + keywords[i + 2]
        break

print(text)

for i in range(0, len(keywords)):
    if keywords[i] == "Due" and keywords[i + 1] == "Date":
        text = keywords[i] + " " + keywords[i + 1] + " " + keywords[i + 2]
        break

print(text)
