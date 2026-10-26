import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript.jsonl'
out_path = r'd:\Projects\ОБНОВА\scratch\user_inputs.txt'

lines_out = []
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        if obj.get('type') == 'USER_INPUT':
            content = obj.get('content', '')
            req = content
            if '<USER_REQUEST>' in content:
                req = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].strip()
            lines_out.append(f"Step {obj.get('step_index')}: {req}")

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_out[-25:]))
