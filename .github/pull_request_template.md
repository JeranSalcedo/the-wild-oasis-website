---
name: pull_request
type: contract
---

# PR CONTRACT (MUST FOLLOW STRICTLY)

This document defines a structured format for all pull requests.
Any deviation from this structure is considered invalid.

---

## SUMMARY

type: string
format: paragraph
constraints:

- MUST be exactly one paragraph
- MUST be 2–6 sentences
- MUST NOT contain bullet points
- MUST NOT contain file paths
- MUST NOT contain commit hashes
- MUST describe:
    - what changed (high level)
    - why it changed
    - overall impact

---

## CHANGES

type: array
structure: scoped_groups

Each item in CHANGES MUST be a scope object:

scope:
title:
type: string
format: markdown_heading_level_3

changes:
type: array
items:
type: object

      fields:
        description:
          type: string
          requirement: required

        files:
          type: array
          items:
            type: string
            format: full_path
            style: inline_code

        commit:
          type: string
          format: short_hash_or_message

constraints:

- Each scope MUST represent exactly one commit group
- Scopes MUST NOT overlap in responsibility
- Files MUST belong only to one scope
- No scope aggregation or splitting is allowed at PR generation time
- Scope titles MUST match commit group intent

example:

### auth

- description: Add login API integration
  files:
    - `src/services/auth.ts`
    - `src/api/login.ts`
      commit: feat(auth): add login API

---

### ui

- description: Implement login form UI
  files:
    - `src/components/LoginForm.tsx`
      commit: feat(ui): implement login form

---

## NOTES

type: string
format: paragraph_or_empty

rules:

- OPTIONAL section
- MUST be "N/A" if no notes exist
- MAY include:
    - edge cases
    - tradeoffs
    - implementation details
- MUST NOT repeat CHANGES section

---

## GLOBAL RULES

- All output MUST follow this contract exactly
- No additional sections are allowed
- No restructuring of CHANGES is allowed
- No merging or splitting scopes at PR generation time
- Inline code formatting MUST be used for all technical references:
    - files → `path/to/file.ts`
    - branches → `feature/name`
    - commits → `abc1234`
    - commands → `git commit`

---

## VALIDITY RULE

A PR is invalid if:

- Summary is not a single paragraph
- CHANGES scopes are not 1:1 with commit groups
- Any file appears in multiple scopes
- Any section is missing required fields
