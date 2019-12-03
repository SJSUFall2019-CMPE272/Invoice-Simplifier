import Image, ImageEnhance

image = Image.open('denoised.jpg')
enhancer = ImageEnhance.Sharpness(image)

image = enhancer.enhance(2.0)

image.save('modified.jpg')
