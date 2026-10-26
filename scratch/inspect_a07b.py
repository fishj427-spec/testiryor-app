import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\a07b3375-2c18-445e-a963-2382a01503b3\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f, open(r'd:\Projects\ОБНОВА\scratch\user_inputs_a07b.txt', 'w', encoding='utf-8') as out:
    for line in f:
        obj = json.loads(line)
        if obj.get('type') == 'USER_INPUT':
            content = obj.get('content', '')
            req = content
            if '<USER_REQUEST>' in content:
                req = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].strip()
            out.write(f"Step {obj.get('step_index')}: {req}\n")
