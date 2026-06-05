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

5. Suggest a pull request title and description for a PR from `<child_branch>` into `<parent_branch>`. The title should be concise and follow the same conventions as commit messages. The PR description must strictly follow the repository’s `.github/pull_request_template.md` structure and formatting. All formatting rules (lists, grouping, inline code formatting) must be applied within the constraints of the template structure. When listing files, group them by directory where possible. All references to code elements must use inline markdown code formatting:
    - Branch names: `feature/branch-name`
    - File names: `src/components/Button.tsx`
    - Directories: `src/components/`
    - Commits: `abc1234`
    - Issues: `#123`
    - Pull requests: `#123`
    - Functions / variables: `handleClick()`, `isLoading`
    - Commands: `git commit`, `npm install`

    Only apply inline code formatting to explicit technical references, not general nouns or concepts.

    Within each section, prefer bullet points and grouped lists over prose unless the template explicitly requires narrative text. The user must explicitly confirm PR creation in the execution plan before the pull request is created.

    If a template section cannot be meaningfully filled, write "N/A".

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
