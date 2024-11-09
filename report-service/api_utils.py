import json

def wrap_answer(result) -> bytes:
    return json.dumps(result).encode('utf-8')
