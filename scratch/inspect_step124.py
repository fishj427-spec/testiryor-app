import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\a07b3375-2c18-445e-a963-2382a01503b3\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f, open(r'd:\Projects\ОБНОВА\scratch\step124_details.txt', 'w', encoding='utf-8') as out:
    for line in f:
        obj = json.loads(line)
        if obj.get('step_index') in [124, 125, 126]:
            out.write(json.dumps(obj, ensure_ascii=False, indent=2))
