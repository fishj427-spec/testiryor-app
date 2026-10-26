import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f, open(r'd:\Projects\ОБНОВА\scratch\step_after_852.txt', 'w', encoding='utf-8') as out:
    for line in f:
        obj = json.loads(line)
        if obj.get('step_index') > 852:
            out.write(f"Step {obj.get('step_index')} [{obj.get('type')}] ({obj.get('source')}): {str(obj.get('content'))[:200]}\n")
            if obj.get('tool_calls'):
                for tc in obj.get('tool_calls'):
                    out.write(f"   Tool: {tc.get('name')}, args: {json.dumps(tc.get('arguments', {}), ensure_ascii=False)[:200]}\n")
