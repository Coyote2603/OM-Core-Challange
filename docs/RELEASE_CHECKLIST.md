# Public release checklist

Use this checklist before the first publication and before any release that adds or changes educational content.

## Repository origin

- [ ] This is a new sanitized repository, not a fork or renamed copy of a private teaching repository.
- [ ] No private `.git` history, branches, tags, releases, issues, or pull requests were imported.
- [ ] The first public commit contains only reviewed public files.
- [ ] Repository visibility, Pages visibility, and deployment visibility have each been checked independently.

## Content provenance

- [ ] Every exercise, solution, diagram, and explanation was created for public release or has a documented compatible license.
- [ ] No original private institutional tutorials, course packs, assessments, teaching notes, recordings, cases, or answer keys are present.
- [ ] No student submissions, names, grades, identifiers, photographs, voices, or comments are present.
- [ ] Fictional examples cannot reasonably be mistaken for confidential real cases.
- [ ] External sources and assets are credited in the appropriate notice file.
- [ ] Institutional names, logos, and trademarks are used only with permission.

## Resources and access

- [ ] Every repository-local resource is intended for unrestricted public access.
- [ ] Every restricted resource remains outside the repository.
- [ ] Restricted links point to an authenticated LMS or server-side protected service.
- [ ] Restricted destinations were tested while signed out and in a private browser window.
- [ ] URLs contain no access token, signed query string, personal identifier, or secret.

## Configuration and content

- [ ] `js/site-config.js` contains the intended public identity and no placeholder institution or instructor information.
- [ ] Session numbers are unique and contiguous from 1, and slugs are unique.
- [ ] Objectives match the activities and feedback.
- [ ] Every problem and solution has been checked for accuracy.
- [ ] Mathematical expressions render correctly.
- [ ] Hint text is appropriate for public inspection.
- [ ] All placeholder URLs and `TBD` text intended for removal have been resolved.

## Automated checks

- [ ] `npm run check` passes locally.
- [ ] The GitHub Actions quality workflow passes on the release commit.
- [ ] The public-content manifest still reflects all runtime directories and license scopes.
- [ ] No prohibited binary was added by Git LFS, a release attachment, or another publishing path.

## Browser and accessibility review

- [ ] Dashboard, every session, presenter mode, and the OM Core Challenge page were opened from a local HTTP server.
- [ ] Every answer, hint, material link, and reading link was exercised.
- [ ] Presenter mode works with keyboard navigation.
- [ ] The OM Core Challenge works through all six questions (wrong-answer hint and correct-answer solution) and can restart.
- [ ] Pages remain usable at phone, laptop, and projector widths.
- [ ] Interactive controls have visible focus and meaningful labels.
- [ ] Diagrams have text equivalents or accessible labels.
- [ ] Color is not the only way important state is conveyed.
- [ ] Browser console and network panel show no unexpected errors or requests.

## Licensing and governance

- [ ] The root `LICENSE`, `LICENSES/CC-BY-4.0.txt`, and `LICENSING.md` are present.
- [ ] `THIRD_PARTY_NOTICES.md` matches the vendored dependencies and assets.
- [ ] The platform and game credit to Stefanos Poulidis is preserved.
- [ ] The acknowledgment of Jiatao Ding, Bengisu, Clara Carrera, and other INSEAD PhD colleagues does not imply that their materials are included or licensed.
- [ ] Contribution, conduct, security, and citation files are current.

## Production verification

- [ ] The live URL serves the intended release commit.
- [ ] Relative assets work at the deployed subpath.
- [ ] HTTPS is active.
- [ ] A signed-out visitor sees no restricted content.
- [ ] Cached or previous deployments do not expose removed files.
- [ ] The maintainer has recorded the release tag or commit and the date of verification.

Do not release with an unchecked privacy, provenance, or access-control item. A teaching deadline is not a reason to make restricted material public.
