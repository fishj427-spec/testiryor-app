import json

with open(r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        idx = obj.get('step_index')
        if idx in [515, 520, 525, 530, 535, 540, 545, 550, 555]:
            c = str(obj.get('content', ''))
            print(f"=== STEP {idx} ===\n{c[:500]}\n")
