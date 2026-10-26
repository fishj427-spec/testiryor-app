import json

with open(r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        c = str(obj.get('content', ''))
        if 'PSIGT_QUESTIONS' in c or 'media_1792773045' in c or '25 вопросов' in c:
            print(f"Step {obj.get('step_index')}: {c[:250]}\n---")
По