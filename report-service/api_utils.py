import json

def wrap_answer(result) -> bytes:
    return json.dumps(result, default=vars,ensure_ascii=False).encode('utf-8')
