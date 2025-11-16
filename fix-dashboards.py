#!/usr/bin/env python3
import json
import re
from pathlib import Path

def fix_backend_dashboard(file_path):
    """Fix backend dashboard queries from job= to service="""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Fix all panels
    for panel in dashboard.get('panels', []):
        if 'targets' in panel:
            for target in panel['targets']:
                if 'expr' in target:
                    # Replace job="xxx-service" with service="xxx-service"
                    target['expr'] = re.sub(
                        r'job="(auth-service|order-service|restaurant-service|payment-service)"',
                        r'service="\1"',
                        target['expr']
                    )
    
    # Save fixed dashboard
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed {file_path}")

def fix_frontend_dashboard(file_path):
    """Remove service-specific prefixes from frontend metrics"""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Fix all panels
    for panel in dashboard.get('panels', []):
        if 'targets' in panel:
            for target in panel['targets']:
                if 'expr' in target:
                    # Remove prefixes like client_frontend_, admin_frontend_, etc
                    target['expr'] = re.sub(
                        r'(client_frontend_|admin_frontend_|restaurant_frontend_)',
                        '',
                        target['expr']
                    )
    
    # Save fixed dashboard
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed {file_path}")

def fix_loki_dashboard(file_path):
    """Fix Loki dashboard: remove __inputs and fix datasources"""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Remove __inputs and __requires
    if '__inputs' in dashboard:
        del dashboard['__inputs']
    if '__requires' in dashboard:
        del dashboard['__requires']
    
    # Fix datasource references
    def replace_datasource(obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                if key == 'datasource':
                    # Convert string datasource to object
                    if isinstance(value, str):
                        if value in ['Prometheus', '${DS_PROMETHEUS}', 'prometheus']:
                            obj[key] = {'type': 'prometheus', 'uid': 'prometheus'}
                        elif value in ['Loki', '${DS_LOKI}', 'loki']:
                            obj[key] = {'type': 'loki', 'uid': 'loki'}
                    # Fix UID in dict datasource
                    elif isinstance(value, dict):
                        if value.get('uid') in ['${DS_PROMETHEUS}', 'PBFA97CFB590B2093']:
                            value['uid'] = 'prometheus'
                            value['type'] = 'prometheus'
                        elif value.get('uid') == '${DS_LOKI}':
                            value['uid'] = 'loki'
                            value['type'] = 'loki'
                elif isinstance(value, (dict, list)):
                    replace_datasource(value)
        elif isinstance(obj, list):
            for item in obj:
                replace_datasource(item)
    
    replace_datasource(dashboard)
    
    # Save fixed dashboard
    output_path = file_path.replace('.json', '-fixed.json') if not file_path.endswith('-fixed.json') else file_path
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed Loki dashboard: {output_path}")

def fix_datasource_uid(file_path):
    """Fix datasource UIDs in any dashboard"""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Fix datasource UID
    def replace_datasource(obj):
        if isinstance(obj, dict):
            for key, value in obj.items():
                if key == 'datasource':
                    if isinstance(value, dict):
                        if value.get('uid') == 'PBFA97CFB590B2093':
                            value['uid'] = 'prometheus'
                            value['type'] = 'prometheus'
                elif isinstance(value, (dict, list)):
                    replace_datasource(value)
        elif isinstance(obj, list):
            for item in obj:
                replace_datasource(item)
    
    replace_datasource(dashboard)
    
    # Save fixed dashboard
    output_path = file_path.replace('.json', '-fixed.json') if not file_path.endswith('-fixed.json') else file_path
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed datasource UID: {output_path}")

def fix_loki_dashboard(file_path):
    """Fix Loki dashboard datasource inputs"""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Remove __inputs if present
    if '__inputs' in dashboard:
        del dashboard['__inputs']
    
    # Fix datasource references in all panels
    for panel in dashboard.get('panels', []):
        if isinstance(panel.get('datasource'), str):
            if 'Prometheus' in panel['datasource'] or 'DS_PROMETHEUS' in panel['datasource']:
                panel['datasource'] = {
                    'type': 'prometheus',
                    'uid': 'prometheus'
                }
            elif 'Loki' in panel['datasource'] or 'DS_LOKI' in panel['datasource']:
                panel['datasource'] = {
                    'type': 'loki',
                    'uid': 'loki'
                }
        
        # Fix targets
        if 'targets' in panel:
            for target in panel['targets']:
                if isinstance(target.get('datasource'), str):
                    if 'Prometheus' in target['datasource'] or 'DS_PROMETHEUS' in target['datasource']:
                        target['datasource'] = {
                            'type': 'prometheus',
                            'uid': 'prometheus'
                        }
                    elif 'Loki' in target['datasource'] or 'DS_LOKI' in target['datasource']:
                        target['datasource'] = {
                            'type': 'loki',
                            'uid': 'loki'
                        }
    
    # Save fixed dashboard
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed {file_path}")

def fix_nodejs_dashboard(file_path):
    """Fix nodejs dashboard datasource UID"""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Fix datasource references
    for panel in dashboard.get('panels', []):
        if 'datasource' in panel:
            if panel['datasource'].get('uid') == 'PBFA97CFB590B2093':
                panel['datasource']['uid'] = 'prometheus'
        
        if 'targets' in panel:
            for target in panel['targets']:
                if 'datasource' in target:
                    if target['datasource'].get('uid') == 'PBFA97CFB590B2093':
                        target['datasource']['uid'] = 'prometheus'
    
    # Fix templating variables if any
    if 'templating' in dashboard and 'list' in dashboard['templating']:
        for var in dashboard['templating']['list']:
            if 'datasource' in var:
                if isinstance(var['datasource'], dict) and var['datasource'].get('uid') == 'PBFA97CFB590B2093':
                    var['datasource']['uid'] = 'prometheus'
    
    # Save fixed dashboard
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed {file_path}")

def fix_system_dashboard(file_path):
    """Fix system dashboard datasource UID"""
    with open(file_path, 'r', encoding='utf-8') as f:
        dashboard = json.load(f)
    
    # Fix datasource references
    for panel in dashboard.get('panels', []):
        if 'datasource' in panel:
            if panel['datasource'].get('uid') == 'PBFA97CFB590B2093':
                panel['datasource']['uid'] = 'prometheus'
        
        if 'targets' in panel:
            for target in panel['targets']:
                if 'datasource' in target:
                    if target['datasource'].get('uid') == 'PBFA97CFB590B2093':
                        target['datasource']['uid'] = 'prometheus'
    
    # Save fixed dashboard
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard, f, indent=2)
    
    print(f"✓ Fixed {file_path}")

def main():
    dashboards_dir = Path('dashboards/json')
    
    print("\n=== FIXING DASHBOARDS ===\n")
    
    # Fix backend dashboard
    backend_file = dashboards_dir / 'backend-overview.json'
    if backend_file.exists():
        fix_backend_dashboard(backend_file)
    
    # Fix frontend dashboard
    frontend_file = dashboards_dir / 'frontend-overview.json'
    if frontend_file.exists():
        fix_frontend_dashboard(frontend_file)
    
    # Fix Loki dashboard
    loki_file = dashboards_dir / '14055_rev5.json'
    if loki_file.exists():
        fix_loki_dashboard(loki_file)
    
    # Fix nodejs dashboard
    nodejs_file = dashboards_dir / 'nodejs-application-dashboard.json'
    if nodejs_file.exists():
        fix_nodejs_dashboard(nodejs_file)
    
    # Fix system dashboard
    system_file = dashboards_dir / 'system-overview.json'
    if system_file.exists():
        fix_system_dashboard(system_file)
    
    print("\n✓ All dashboards fixed!\n")

if __name__ == '__main__':
    main()
