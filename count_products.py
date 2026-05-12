import pathlib, re, json
path=pathlib.Path(r"c:\Users\Family\Downloads\book exchange\moulee project 1\moulee project\src\data\products.js")
text=path.read_text()
js=text
js=js.replace("asset('", '"').replace("')", '"')
js=js.split('export const PRODUCTS =')[1]
js=js.split('];')[0]+']'
js=js.replace("'", '"')
js=re.sub(r',\s*}', '}', js)
js=re.sub(r',\s*]', ']', js)
products=json.loads(js)
from collections import Counter
counts=Counter(p['category'] for p in products)
print(counts)
