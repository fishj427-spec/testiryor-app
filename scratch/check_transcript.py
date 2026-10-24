import json

with open(r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        if obj.get('step_index') in [35, 36, 37, 38, 39, 40, 41, 42, 43, 44]:
            t = obj.get('type')
            c = str(obj.get('content', ''))
            print(f"Step {obj.get('step_index')} [{t}]: {c[:150]}")
