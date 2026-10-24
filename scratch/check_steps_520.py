import json

with open(r'C:\Users\Марсель\.gemini\antigravity-ide\brain\0685015c-b814-4dfc-8d60-10a5ca94fe09\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        idx = obj.get('step_index')
        if idx in range(520, 540):
            t = obj.get('type')
            c = str(obj.get('content', ''))
            print(f"Step {idx} [{t}]: {c[:300]}")
            for tc in obj.get('tool_calls', []):
                print(f"  TC: {tc.get('name')}")
                if 'build_two_disciplines' in str(tc) or 'PSIGT' in str(tc):
                    print(f"  ARGS: {str(tc)[:200]}")
