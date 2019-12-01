def getTax (file):
    texes = []
    with open("text.txt") as fp:
        line = fp.readline().lower()
        while line:
            list = line.lower().split()
            if "(h)hst" in line:
                tax = list[-1]
            if "tax" in line:
                tax = list[-1]

            line = fp.readline().lower()
