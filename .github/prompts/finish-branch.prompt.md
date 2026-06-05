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

5. Generate a pull request title and a PR description for a PR from `<child_branch>` into `<parent_branch>`.

    This step MUST treat the PR as a rendering of previously defined commit groups.
    No new grouping, interpretation, or restructuring of changes is allowed.

    The PR MUST follow the PR CONTRACT defined in `.github/pull_request_template.md`.

    ***

    ## PR TITLE

    type: string
    rules:
    - MUST be concise
    - MUST follow conventional commit style if possible
    - MUST summarize overall change scope
    - MUST NOT list files or detailed changes

    ***

    ## PR DESCRIPTION (CONTRACT RENDERING RULE)

    The PR description MUST be generated strictly according to `.github/pull_request_template.md` (schema contract).

    The commit groups defined earlier in this workflow are the ONLY source of truth.

    ***

    ### RULE 1: SUMMARY
    - Must be exactly one paragraph
    - Must be 3–6 sentences
    - Must describe:
    - what changed (high level)
    - why it changed
    - overall impact
    - MUST NOT contain:
    - bullet points
    - file paths
    - commit hashes
    - scope breakdowns

    ***

    ### RULE 2: CHANGES SECTION (STRICT 1:1 MAPPING)

    type: mapping
    source: commit_groups

    For each commit group:
    - Create exactly one PR scope
    - Scope title MUST match commit group intent
    - No merging or splitting allowed

    Each scope MUST follow this structure:

    ### <scope title>
    - description: <commit group change summary>
    - files:
    - `full/path/to/file`
    - commit:
    - `<commit message or hash>`

    Rules:
    - Every file MUST belong to exactly one scope
    - All commit groups MUST appear exactly once
    - No new scopes may be introduced
    - No scopes may be removed or merged

    ***

    ### RULE 3: NOTES SECTION
    - type: string
    - If no meaningful notes exist, write exactly: "N/A"
    - May include:
    - edge cases
    - trade-offs
    - implementation details
    - MUST NOT repeat anything from SUMMARY or CHANGES

    ***

    ### RULE 4: FORMATTING RULES
    - All technical references MUST use inline code formatting:
    - files → `src/path/file.ts`
    - branches → `feature/name`
    - commits → `abc1234`
    - commands → `git commit`
    - Only apply inline code formatting to explicit technical references
    - Do NOT format general concepts or natural language terms

    ***

    ## EXECUTION CONSTRAINT
    - The PR MUST NOT introduce new structure beyond the template
    - The PR MUST strictly follow `.github/pull_request_template.md`
    - The commit groups defined earlier are the ONLY allowed input source
    - If any rule conflicts, the PR template takes priority

    ***

    ## USER CONFIRMATION RULE

    The PR title and description must be included in the final execution plan.
    The pull request MUST NOT be created unless explicitly confirmed by the user.

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
    - create a pull request from `<child_branch>` to `<parent_branch>` using available tooling such as GitHub CLI

    If pull request creation is not possible, provide the generated title and description and a compare page link the user can use manually.

8. If any operation fails at any step, stop immediately. Explain what failed, what changes were already made, and recommend next steps. Do not proceed with later steps in the plan.
