import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\a07b3375-2c18-445e-a963-2382a01503b3\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f, open(r'd:\Projects\ОБНОВА\scratch\step115_a07b.txt', 'w', encoding='utf-8') as out:
    for line in f:
        obj = json.loads(line)
        if obj.get('step_index') in range(114, 126):
            out.write(f"Step {obj.get('step_index')} [{obj.get('type')}] ({obj.get('source')}): {str(obj.get('content'))[:400]}\n")
            if obj.get('tool_calls'):
                for tc in obj.get('tool_calls'):
                    out.write(f"   Tool: {tc.get('name')}, args: {json.dumps(tc.get('arguments', {}), ensure_ascii=False)[:400]}\n")
