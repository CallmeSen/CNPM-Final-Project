#!/usr/bin/env python3
import json
import sys

def fix_loki_dashboard(file_path, output_path):
    """Fix Loki dashboard: remove __inputs and fix datasources"""
    print(f"Reading {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Remove __inputs and __requires
    if '__inputs' in dashboard:
        print("  - Removing __inputs")
        del dashboard['__inputs']
    if '__requires' in dashboard:
        print("  - Removing __requires")
        del dashboard['__requires']
    
    # Fix datasource references
    def replace_datasource(obj, depth=0):
        if isinstance(obj, dict):
            for key, value in list(obj.items()):
                if key == 'datasource':
                    # Convert string datasource to object
                    if isinstance(value, str):
                        if value in ['Prometheus', '${DS_PROMETHEUS}', 'prometheus']:
                            print(f"  - Fixed datasource: {value} -> prometheus")
                            obj[key] = {'type': 'prometheus', 'uid': 'prometheus'}
                        elif value in ['Loki', '${DS_LOKI}', 'loki']:
                            print(f"  - Fixed datasource: {value} -> loki")
                            obj[key] = {'type': 'loki', 'uid': 'loki'}
                    # Fix UID in dict datasource
                    elif isinstance(value, dict):
                        if value.get('uid') in ['${DS_PROMETHEUS}', 'PBFA97CFB590B2093']:
                            print(f"  - Fixed datasource UID: {value.get('uid')} -> prometheus")
                            value['uid'] = 'prometheus'
                            value['type'] = 'prometheus'
                        elif value.get('uid') == '${DS_LOKI}':
                            print(f"  - Fixed datasource UID: ${DS_LOKI} -> loki")
                            value['uid'] = 'loki'
                            value['type'] = 'loki'
                elif isinstance(value, (dict, list)):
                    replace_datasource(value, depth+1)
        elif isinstance(obj, list):
            for item in obj:
                replace_datasource(item, depth+1)
    
    print("  - Fixing datasource references...")
    replace_datasource(dashboard)
    
    # Save fixed dashboard
    print(f"Writing {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed Loki dashboard saved to: {output_path}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python fix-loki-dashboard.py <input.json> [output.json]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.replace('.json', '-fixed.json')
    
    fix_loki_dashboard(input_file, output_file)
