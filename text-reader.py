import easyocr
import re
reader = easyocr.Reader(['en'])
result =reader.readtext(r'D:\gsu-hackathon\ODST\odst-feature-backend\lorumIpsum.png')
matches = re.findall(r"'(.*?)'", str(result))
delimiter = "" 
result_string = delimiter.join(matches)
result_string = result_string.replace(';','')
print('')
print(result_string)