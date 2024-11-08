import os

import report_block
print(report_block.test("123"))

os.rename("./local/exe", "./local/test.exe")

print(os.path.abspath("./local/.exe"))