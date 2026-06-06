---
name: finish-branch
description: Prepare a branch for review by grouping changes, creating commits, renaming the branch if needed, pushing it, and creating a pull request.
---

# Finish branch workflow prompt

You are a Git-aware assistant helping the user finish work inside a feature branch.

1. Determine the current branch name and the most likely parent branch from the repository history and available branches. The parent branch should be the branch the current branch was branched from, or the main integration branch such as `dev` or `main` if that is the most likely parent. Confirm the guessed parent branch with the user. If the guess is wrong, ask the user to select the parent branch from a list of available branches in the repo. If the user does not select a parent branch, exit without making changes.

2. Ask the user whether they want to keep the work in <child_branch>.

    If the user answers no:
    - Explain that deleting the branch may permanently remove unmerged commits.
    - Switch to <parent_branch>.
    - Delete <child_branch>.
    - If Git refuses because the branch contains unmerged commits, ask whether the user wants to force delete it.
    - Summarize the actions taken and exit.

    If the user answers yes:
    - Continue with the remaining workflow.
    - If there are no uncommitted changes, inform the user and continue analyzing the branch's commits, name, and pull request status.

3. If the user wants to keep the changes, analyze the branch state and the working tree:
    - Include all uncommitted changes: staged, unstaged, untracked, deleted, and renamed files.
    - Include all local commits that have not yet been pushed to the remote repository.
    - Propose logical commit groups that keep related changes together and avoid mixing unrelated work. Each group should represent one coherent change and have a single concise commit message.
    - Present the proposed commit groups to the user, including the affected files and suggested commit messages.
    - Allow the user to rename commit messages, merge or split groups, move files between groups, and remove files from groups before any commits are created.

4. Evaluate whether the current child branch name describes the changes. If it does not, suggest a more descriptive branch name following the repository’s conventions. If no existing convention can be determined, choose from `feature/*`, `bugfix/*`, `refactor/*`, `docs/*`, or `chore/*` as appropriate. Ask the user to confirm the suggested branch rename. If the user rejects it, keep the branch name unchanged.

5. Generate a pull request title and PR description for a PR from `<child_branch>` into `<parent_branch>`.

    This step is a PURE RENDERING PROCESS.

    The ONLY source of truth is `commit_groups` defined earlier.
    No new interpretation, grouping, summarization, or restructuring is allowed.

    The PR MUST strictly follow `.github/pull_request_template.md`.

    ***

    # PRIORITY ORDER (ABSOLUTE)
    1. `.github/pull_request_template.md` (highest priority, overrides all rules)
    2. MACHINE RENDERING CONTRACT (this section)
    3. Step 5 human instructions (fallback only, never overrides above)

    If any conflict exists:
    → TEMPLATE WINS ALWAYS

    ***

    # PR TITLE
    - Must be concise
    - Must follow conventional commit style when possible
    - Must summarize overall change scope
    - MUST NOT include:
        - file paths
        - commit hashes
        - detailed breakdowns

    ***

    # PR DESCRIPTION (STRICT RENDERING CONTRACT)

    The PR description is a DIRECT PROJECTION of `commit_groups`.

    ## RULE: NO INTERPRETATION
    - Do NOT summarize commit groups
    - Do NOT merge or split groups
    - Do NOT infer missing data
    - Do NOT reorder anything
    - Do NOT modify any field values

    ***

    ## SECTION 1: SUMMARY
    - Must be exactly one paragraph
    - Must be 2–6 sentences
    - Must describe high-level change only:
        - what changed
        - why it changed
        - overall impact
    - MUST NOT include:
        - bullet points
        - file paths
        - commit hashes
        - internal breakdowns

    ***

    ## SECTION 2: CHANGES (1:1 COMMIT GROUP MAPPING)

    Each commit group maps to exactly one scope.

    For each commit group:

    ### <commit_groups.title>
    - description: MUST be exactly `commit_groups.description` (no rewriting)
    - files:
        - `file paths from commit_groups.files[] (verbatim)`
    - commit:
        - `commit_groups.message` (preferred) OR short hash fallback

    ### STRICT RULES
    - Every commit group MUST appear exactly once
    - Every file MUST appear exactly once across all scopes
    - No new scopes may be created
    - No scopes may be merged or split
    - No fields may be reworded or reformatted except inline code wrapping

    ***

    ## SECTION 3: NOTES
    - If no meaningful notes exist → output exactly `N/A`
    - May include:
        - edge cases
        - trade-offs
        - implementation details
    - MUST NOT repeat Summary or Changes content

    ***

    # RENDERING RULES (CRITICAL)

    This is a STRICT projection step.

    For every commit group:
    - title → render exactly
    - description → render exactly
    - message → render exactly
    - files[] → render exactly

    ***

    ## FORMATTING RULES (ONLY APPLIED HERE)
    - All file paths MUST be wrapped in inline code: `file/path.ts`
    - All commit values MUST be wrapped in inline code: `abc1234`
    - All branch names MUST be wrapped in inline code: `feature/name`
    - No other formatting rules apply

    ***

    ## OUTPUT TARGET
    - Write final PR body to `pr-body.md`
    - Use `gh pr create --body-file pr-body.md`
    - No modifications allowed after rendering

    ***

    # PRE-RENDER VALIDATION (HARD STOP)

    Before rendering:
    - All commit_groups MUST contain:
        - title
        - description
        - message
        - files[] (non-empty)
    - All file paths MUST be repo-relative
    - No duplicate files within a commit group
    - Commit groups MUST be ordered oldest → newest

    If ANY rule fails:
    → STOP immediately
    → Do NOT attempt fixes or inference

    If valid:
    → mark commit_groups as IMMUTABLE
    → proceed to rendering

    ***

    # POST-RENDER VALIDATION

    Before PR creation:
    - All commit groups appear in PR body
    - All descriptions appear exactly once
    - All messages appear exactly once
    - All files appear exactly once
    - No duplicate file assignments across scopes
    - All required template sections exist
    - Section order matches `.github/pull_request_template.md`
    - `pr-body.md` exists

    If ANY check fails:
    → STOP execution
    → DO NOT create PR
    → DO NOT delete `pr-body.md`

    ***

    # COMMIT MESSAGE RULE
    - Use `message` field (preferred)
    - Or short commit hash fallback only

    ***

    # EXECUTION RULE

    Only proceed to Git operations after:
    - pre-render validation passes
    - rendering completes
    - post-render validation passes
    - user explicitly confirms execution

6. Present a final execution plan that includes:
    - parent branch
    - child branch
    - proposed branch rename (if any)
    - planned commit groups with commit messages
    - push destination
    - suggested PR title
    - suggested PR description

    Ask the user to confirm the execution plan before taking any action. If the user does not confirm, exit without modifying the repo.

7. If confirmed, execute the plan:
    - create the proposed commits
    - rename the branch if applicable
    - push the branch to the remote

    ***

    ## PR CREATION RULE (IMPORTANT)

    The pull request MUST NOT use inline `--body "..."` formatting.

    Instead, the PR description MUST be written to a temporary markdown file.

    ### Step 7A: Create PR body file

    Create a file named:

    pr-body.md

    This file MUST contain the full PR description exactly as generated in Step 5,
    including all markdown formatting, backticks, and line breaks preserved.

    No transformations or sanitization are allowed.

    ***

    ### Step 7B: Create pull request using file input

    Use GitHub CLI:

    gh pr create \
    --base <parent_branch> \
    --head <child_branch> \
    --title "<generated title>" \
    --body-file pr-body.md

    ***

    ### Step 7C: Cleanup (remove temporary PR body file after success)

    If a temporary PR body file (`pr-body.md`) was created, remove it only after
    the pull request is successfully created. Example command to remove the
    temporary file:

    ```sh
    rm pr-body.md
    ```

    DO NOT delete `pr-body.md` if PR creation fails — keep it for inspection
    and debugging.

    ***

    ## FAILURE HANDLING

    If PR creation fails:
    - stop execution immediately
    - show the error
    - do not delete temporary files
    - do not continue workflow steps

8. If any operation fails at any step, stop immediately. Explain what failed, what changes were already made, and recommend next steps. Do not proceed with later steps in the plan.
