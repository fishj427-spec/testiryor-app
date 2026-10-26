import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f, open(r'd:\Projects\ОБНОВА\scratch\step851_details.txt', 'w', encoding='utf-8') as out:
    for line in f:
        obj = json.loads(line)
        if obj.get('step_index') in [851, 852]:
            out.write(json.dumps(obj, ensure_ascii=False, indent=2))
