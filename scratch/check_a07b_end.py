import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\a07b3375-2c18-445e-a963-2382a01503b3\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for l in lines[-10:]:
        obj = json.loads(l)
        print(f"Step {obj.get('step_index')} [{obj.get('type')}]: {str(obj.get('content'))[:200]}")
