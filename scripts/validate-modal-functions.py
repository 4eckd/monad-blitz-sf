#!/usr/bin/env python3
"""
Offline validation of Modal functions
Tests syntax and structure without requiring Modal server connection
"""

import ast
import sys
from pathlib import Path
from typing import List, Tuple

# Colors for output
RED = '\033[0;31m'
GREEN = '\033[0;32m'
YELLOW = '\033[1;33m'
BLUE = '\033[0;34m'
NC = '\033[0m'  # No Color


def validate_python_syntax(filepath: Path) -> Tuple[bool, str]:
    """Validate Python syntax of a file"""
    try:
        with open(filepath, 'r') as f:
            code = f.read()
        ast.parse(code)
        return True, "Syntax valid"
    except SyntaxError as e:
        return False, f"Syntax error: {e}"
    except Exception as e:
        return False, f"Error: {e}"


def check_modal_imports(filepath: Path) -> Tuple[bool, str]:
    """Check if Modal is imported correctly"""
    try:
        with open(filepath, 'r') as f:
            code = f.read()

        tree = ast.parse(code)

        has_modal_import = False
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name == 'modal':
                        has_modal_import = True
            elif isinstance(node, ast.ImportFrom):
                if node.module == 'modal':
                    has_modal_import = True

        if has_modal_import:
            return True, "Modal imported correctly"
        else:
            return False, "Modal not imported"
    except Exception as e:
        return False, f"Error checking imports: {e}"


def check_modal_stub(filepath: Path) -> Tuple[bool, str]:
    """Check if Modal stub/app is defined"""
    try:
        with open(filepath, 'r') as f:
            code = f.read()

        if 'modal.Stub(' in code or 'modal.App(' in code:
            return True, "Modal stub/app defined"
        else:
            return False, "No Modal stub/app found"
    except Exception as e:
        return False, f"Error: {e}"


def check_modal_functions(filepath: Path) -> Tuple[bool, str]:
    """Check if Modal functions are decorated"""
    try:
        with open(filepath, 'r') as f:
            code = f.read()

        tree = ast.parse(code)

        modal_functions = []
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                for decorator in node.decorator_list:
                    if isinstance(decorator, ast.Attribute):
                        if decorator.attr == 'function':
                            modal_functions.append(node.name)
                    elif isinstance(decorator, ast.Call):
                        if isinstance(decorator.func, ast.Attribute):
                            if decorator.func.attr == 'function':
                                modal_functions.append(node.name)

        if modal_functions:
            return True, f"Found {len(modal_functions)} Modal function(s): {', '.join(modal_functions)}"
        else:
            return False, "No Modal functions found"
    except Exception as e:
        return False, f"Error: {e}"


def validate_file(filepath: Path) -> dict:
    """Run all validations on a file"""
    results = {
        'filepath': filepath,
        'checks': []
    }

    # Check 1: Python syntax
    valid, msg = validate_python_syntax(filepath)
    results['checks'].append(('Syntax', valid, msg))

    if not valid:
        return results

    # Check 2: Modal imports
    valid, msg = check_modal_imports(filepath)
    results['checks'].append(('Modal Import', valid, msg))

    # Check 3: Modal stub
    valid, msg = check_modal_stub(filepath)
    results['checks'].append(('Modal Stub/App', valid, msg))

    # Check 4: Modal functions
    valid, msg = check_modal_functions(filepath)
    results['checks'].append(('Modal Functions', valid, msg))

    return results


def print_results(results: dict):
    """Print validation results"""
    filepath = results['filepath']
    print(f"\n{BLUE}{'='*60}{NC}")
    print(f"{BLUE}File: {filepath}{NC}")
    print(f"{BLUE}{'='*60}{NC}")

    all_passed = True
    for check_name, valid, msg in results['checks']:
        status = f"{GREEN}✅{NC}" if valid else f"{RED}❌{NC}"
        print(f"{status} {check_name:20s}: {msg}")
        if not valid:
            all_passed = False

    return all_passed


def main():
    """Main validation function"""
    print(f"{BLUE}{'='*60}{NC}")
    print(f"{BLUE}Modal Functions Validation (Offline){NC}")
    print(f"{BLUE}{'='*60}{NC}")

    # Find all Modal Python files
    modal_dir = Path('modal_functions')

    if not modal_dir.exists():
        print(f"{RED}❌ modal_functions directory not found{NC}")
        sys.exit(1)

    python_files = list(modal_dir.rglob('*.py'))

    if not python_files:
        print(f"{RED}❌ No Python files found in modal_functions/{NC}")
        sys.exit(1)

    print(f"\n{YELLOW}Found {len(python_files)} Python file(s) to validate{NC}\n")

    all_files_valid = True
    results_list = []

    for filepath in python_files:
        # Skip __pycache__
        if '__pycache__' in str(filepath):
            continue

        results = validate_file(filepath)
        results_list.append(results)
        file_valid = print_results(results)

        if not file_valid:
            all_files_valid = False

    # Summary
    print(f"\n{BLUE}{'='*60}{NC}")
    print(f"{BLUE}Validation Summary{NC}")
    print(f"{BLUE}{'='*60}{NC}")

    total = len(results_list)
    passed = sum(1 for r in results_list if all(check[1] for check in r['checks']))

    print(f"\nTotal files: {total}")
    print(f"{GREEN}Passed: {passed}{NC}")
    print(f"{RED}Failed: {total - passed}{NC}")

    if all_files_valid:
        print(f"\n{GREEN}✅ All Modal functions are valid!{NC}")
        print(f"\n{YELLOW}Ready to deploy when network connectivity is available.{NC}")
        print(f"Run: {BLUE}./scripts/modal-deploy.sh{NC}")
        sys.exit(0)
    else:
        print(f"\n{RED}❌ Some validation checks failed{NC}")
        print(f"\n{YELLOW}Fix the issues above before deployment.{NC}")
        sys.exit(1)


if __name__ == '__main__':
    main()
