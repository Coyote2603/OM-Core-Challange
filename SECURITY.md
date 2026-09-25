# Security and privacy policy

## Supported version

Security and privacy fixes are applied to the current default branch.

| Version | Supported |
| --- | --- |
| Default branch | Yes |
| Older snapshots and forks | No |

## Report a vulnerability or exposure privately

Do not open a public issue if you find:

- a password, API key, token, private URL, or other credential;
- restricted course material or an answer key;
- student names, submissions, grades, recordings, or other personal data;
- a path that unintentionally exposes a private resource; or
- a vulnerability that would be unsafe to disclose before a fix exists.

Use the repository's **Security** tab and select **Report a vulnerability** to create a private GitHub Security Advisory. If private reporting is unavailable, contact the maintainer through an established private channel without attaching the sensitive material. Include only the minimum information needed to locate and assess the issue.

Maintainers should acknowledge a report promptly, contain any exposed data, rotate affected credentials, remove public access where possible, and review Git history and deployment artifacts. Deleting a file in a later commit does not remove it from earlier commits, forks, caches, or published releases.

## Static-site security model

This project is a static website. It has no server-side authentication and must not be used to store secrets or enforce access to restricted material.

- Every committed file should be assumed readable by the public.
- JavaScript password checks, hidden links, hashed passwords, obscure filenames, and `robots.txt` are not access controls.
- Browser storage is used only for transient interface state and game behavior. Do not add student identifiers or sensitive responses.
- Restricted files belong in an authenticated LMS or another server-side protected system. The public site may link to that system.
- Confirm access rules while signed out and in a private browser window before sharing a restricted-resource link.

The automated boundary check catches several common leakage patterns, but it is not a legal, privacy, or security review. Maintainers remain responsible for every public release.

## Safe deployment practices

- Enable branch protection and require the quality workflow before merging.
- Review generated diffs and Git history, not only the rendered site.
- Never commit `.env` files, private keys, LMS exports, recordings, student files, or institutional course packs.
- Use least-privilege deployment credentials and GitHub's default read-only workflow permissions.
- Keep vendored dependencies and their notices current.
- If analytics or forms are added, document the data flow and obtain any required institutional or privacy approval first.
