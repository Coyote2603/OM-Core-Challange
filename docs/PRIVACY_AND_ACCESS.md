# Privacy and access

This platform is designed for public static hosting. That makes it inexpensive and portable, but it also creates a hard boundary: the site cannot protect any file that it serves.

## The rule to remember

If a browser can download a file to render the site, a visitor can retrieve that file without using the interface you designed.

This remains true when:

- the link is hidden;
- the page asks for a password in JavaScript;
- the password is stored as a hash;
- the filename is obscure;
- the content appears only after a button click;
- a menu item is disabled; or
- search engines are asked not to index it.

Those techniques can change presentation. They do not provide server-side authorization.

## Visibility map

| Location or mechanism | Public? | Appropriate use |
| --- | --- | --- |
| Files committed to a public repository | Yes | Open code and cleared public content |
| Files deployed to a public static host | Yes | Open code and cleared public content |
| Content hidden by CSS or JavaScript | Yes | Progressive disclosure, not secrecy |
| Values in `js/site-config.js` or `js/content.js` | Yes | Public configuration and public teaching content |
| Browser source maps, network requests, and page source | Yes | Assume visitors will inspect them |
| Authenticated LMS or server-side protected storage | Access-controlled by that service | Restricted decks, cases, recordings, datasets, and solutions |
| Instructor-only LMS area | Access-controlled by that service | Teaching notes, answer keys, facilitation plans |

The visibility of a private repository's hosted site depends on the host and plan. Do not assume repository privacy automatically protects a deployment. Test the deployed URL while signed out.

## Decide where a resource belongs

Ask these questions in order:

1. **Do you own the material or have explicit permission to redistribute it publicly?** If no or uncertain, keep it out.
2. **Does it contain student, participant, employee, patient, or research-subject information?** If yes, keep it out and follow the governing privacy process.
3. **Would public access undermine an assessment, case discussion, or future class?** If yes, use an authenticated teaching system.
4. **Does the file include comments, revision history, speaker notes, hidden sheets, metadata, or embedded media?** Inspect and sanitize before considering release.
5. **Is public availability genuinely useful?** If not, prefer an authenticated destination.

## Safe resource patterns

### A cleared public resource

Place a small, inspectable file under an appropriate public asset directory and link it with a relative URL. Document its author and license where necessary.

```js
{
  label: "Public practice worksheet",
  type: "HTML worksheet",
  description: "A fictional example licensed for public reuse.",
  url: "assets/examples/practice-worksheet.html",
  optional: false
}
```

### A restricted LMS resource

Store the file only in the authenticated LMS and link to its landing page.

```js
{
  label: "Restricted case packet",
  type: "LMS resource",
  description: "Course enrollment and institutional sign-in are required.",
  url: "https://lms.example.edu/your-protected-resource",
  optional: false
}
```

The example domain is a placeholder. After replacing it, verify in a signed-out private window that the destination requests authentication and does not expose a public preview or download URL.

## Never store these in the public project

- Real passwords, password hashes, tokens, API keys, or signed URLs
- Student names, email addresses, identifiers, grades, submissions, or discussion exports
- Classroom or meeting recordings
- Publisher cases, teaching notes, answer keys, test banks, or copyrighted figures without public-redistribution permission
- Private course decks, exercises, worksheets, datasets, or solution files
- LMS exports or backup archives
- Institutional logos or photographs without publication rights
- Documents with hidden comments, tracked changes, speaker notes, or personal metadata

The `.gitignore` and automated public-boundary check cover several common file types and patterns. Neither can decide whether text was copied from a restricted source.

## Publish from a clean history

When deriving a public template from a private teaching repository, make a sanitized export and create a **new Git repository**. Do not:

- fork the private repository;
- change only the repository's visibility;
- delete private files in a new commit and assume they are gone;
- copy the private `.git` directory; or
- publish a branch whose earlier commits contain restricted material.

A safe initial-publication sequence is:

1. copy only the approved runtime, documentation, validation, and license files into a new directory;
2. confirm that the directory has no `.git` folder from the source project;
3. run `npm run check`;
4. inspect all files, including hidden files and assets;
5. initialize a new repository;
6. review the complete first commit; and
7. publish only that clean history.

This repository's `PUBLIC_CONTENT_MANIFEST.json` defines the automated runtime boundary. Human rights and privacy review must still happen before the first commit.

## If something sensitive was published

Treat exposure as real even if it was brief.

1. Disable the deployment or restrict access if the host permits it.
2. Revoke and rotate any credential immediately.
3. Notify the appropriate data owner, institution, or privacy contact.
4. Preserve only the minimum evidence needed for incident response.
5. Remove the item from the current tree and follow the hosting provider's procedure for purging sensitive data from history, releases, caches, and pull-request refs.
6. Check forks, mirrors, package artifacts, and deployment caches.
7. Add a regression rule or test that would detect the same failure.

Do not post the exposed material in a public issue. Follow [Security](../SECURITY.md).

## Student data and analytics

The template collects no student data and includes no analytics. The OM Core Challenge keeps transient state (which questions are solved) in page memory only and does not submit it anywhere.

If an adaptation adds forms, analytics, authentication, a leaderboard, or saved progress, it is no longer the same privacy model. Before deployment:

- document every collected field and its purpose;
- minimize retention;
- secure data in transit and at rest;
- define access and deletion processes;
- obtain any required institutional approval and learner notice; and
- update this privacy guide and the security policy.
