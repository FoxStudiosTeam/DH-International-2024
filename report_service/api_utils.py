import json
from flask import Response
def wrap_answer(result) -> Response:
        return Response(json.dumps(result, default=vars, ensure_ascii=False).encode('utf-8'), content_type='application/json')
