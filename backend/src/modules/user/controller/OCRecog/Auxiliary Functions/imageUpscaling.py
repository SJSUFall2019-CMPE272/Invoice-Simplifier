import cv2
import numpy as np

img = cv2.imread("original.jpg")
median = cv2.bilateralFilter(img, 40, 100, 100)

# cv2.imshow("Original Image", img)
# cv2.imshow("Median Image", median)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

cv2.imwrite("denoised.jpg", median)
