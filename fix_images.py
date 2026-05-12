import re, pathlib

file_path = pathlib.Path(r"c:\Users\Family\Downloads\book exchange\moulee project 1\moulee project\src\data\products.js")
text = file_path.read_text(encoding='utf-8')

def repl(match):
    fname = match.group(1).split('/')[-1].split('\\')[-1]
    return f"image: asset('{fname}')"

new_text = re.sub(r"image:\s*['\"](?:.*?/assest/|.*?\\assest\\)([^'\"]+)['\"]", repl, text)

if "const asset =" not in new_text:
    new_text = "const asset = (filename) => new URL(`../assest/${filename}`, import.meta.url).href;\n\n" + new_text

file_path.write_text(new_text, encoding='utf-8')
print("Updated image paths in products.js")
