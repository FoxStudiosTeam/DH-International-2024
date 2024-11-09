import json

def wrap_answer(result) -> bytes:
    result_string = json.dumps(result)
    return result_string.encode('utf-8')
