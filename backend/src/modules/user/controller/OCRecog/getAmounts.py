def getAmounts(file):
    amountList = {}

    with open("text.txt") as fp:
        line = fp.readline().lower()
        while line:
            list = line.lower().split()
            if "subtotal" in line:
                subtotal = list[-1]
            if "sub total" in line:
                subtotal = list[-1]
            if "discount" in line:
                discount = list[-1]
            if "total" in line:
                amountList["Total"] = list[-1]
            if "amount due" in line:
                amountList["Amount Due"] = list[-1]
            if "amount due" in line:
                amountList["Amount Due"] = list[-1]


            line = fp.readline().lower()
