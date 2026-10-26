import json

log_path = r'C:\Users\Марсель\.gemini\antigravity-ide\brain\a07b3375-2c18-445e-a963-2382a01503b3\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        if obj.get('step_index') > 126:
            for tc in obj.get('tool_calls', []):
                if 'discipline-badge-btn' in json.dumps(tc, ensure_ascii=False):
                    print(f"Step {obj.get('step_index')}: {tc.get('name')}")
