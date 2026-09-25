# Contributing

Thank you for helping make the Interactive Teaching Platform more useful across courses and institutions. Contributions should preserve its low-maintenance, public-safe design.

## Before you begin

- Search existing issues before opening a new one.
- Use an issue for substantial new behavior so maintainers and adopters can discuss the scope first.
- Never post or attach private course content, credentials, student information, or a confidential vulnerability to an issue.
- Read [Licensing](LICENSING.md), [Privacy and access](docs/PRIVACY_AND_ACCESS.md), and the [Code of Conduct](CODE_OF_CONDUCT.md).

## Local workflow

1. Fork the repository and create a focused branch.
2. Serve the repository locally:

   ```bash
   python3 -m http.server 8000
   ```

3. Make a small, coherent change.
4. Test the affected pages with a keyboard and at narrow and wide viewport sizes.
5. Run the checks:

   ```bash
   node scripts/check-public-boundary.mjs
   node scripts/validate-content.mjs
   ```

6. Open a pull request that explains the user-facing effect, testing performed, and any licensing or content-provenance considerations.

## Public-content boundary

Every contribution must be safe to publish and redistribute. Acceptable content includes:

- examples you created specifically for public release;
- public-domain material with its source documented;
- material under a compatible open license with attribution and license terms preserved; and
- links to restricted resources hosted by an authenticated LMS, provided no restricted content is copied into the repository.

Do not contribute:

- original institutional tutorial packs, assessments, instructor notes, cases, recordings, or solution sets;
- student work or personal data;
- publisher content or figures copied without explicit permission;
- secrets, private links, access tokens, or real passwords; or
- large binaries that bypass the repository's public-content manifest.

When in doubt, omit the content and describe the proposed source in the pull request.

## Technical expectations

- Preserve the zero-build vanilla HTML, CSS, and JavaScript architecture unless a maintainer-approved proposal changes that direction.
- Keep configuration in `js/site-config.js` and teaching data in `js/content.js`.
- Maintain compatibility with deployment at a subpath. Prefer relative URLs for repository assets.
- Keep controls keyboard accessible and use semantic HTML, visible focus states, and meaningful labels.
- Avoid introducing remote runtime dependencies when a small local implementation is sufficient.
- Do not add analytics, trackers, forms, or data collection without an explicit privacy design and maintainer approval.
- Update documentation and validation when you change the content schema or public boundary.

## Content changes

For changes to demo sessions:

- keep examples synthetic and institution-neutral;
- verify calculations and answer explanations independently;
- use fictional organizations and people;
- avoid details that could identify a real class, student, assessment, or case; and
- describe the content's authorship or license in the pull request.

## Pull-request review

A pull request is ready when:

- the quality workflow passes;
- the public-content checklist is complete;
- the relevant pages were inspected in a real browser;
- documentation matches the implementation; and
- the diff contains only intended files.

Maintainers may ask for a smaller scope, clearer provenance, accessibility changes, or removal of content whose publication rights are uncertain.

## Contributor licensing

Unless explicitly agreed otherwise, contributions are provided under the repository's existing split license: MIT for code and CC BY 4.0 for original demo educational content and documentation. By contributing, you represent that you have the right to provide the work under those terms.
