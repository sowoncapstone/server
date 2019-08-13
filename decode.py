import sys
import base64

inputData = sys.argv[1]
userId = sys.argv[1]

f = open("image.txt", "r")
txtImage = f.read()

fh = open("save.png", "wb")
fh.write(base64.b64decode(txtImage))
f.close()
fh.close()

print("Hello from decode.py >> decoding complete ")
sys.stdout.flush()