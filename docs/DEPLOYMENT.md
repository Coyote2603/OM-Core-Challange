# Deployment

The platform consists only of static files. It can be hosted on GitHub Pages, an institutional web server, or another static hosting service without a build step.

## Before deploying anywhere

1. Start from a clean public repository with no private-source Git history.
2. Run `npm run check`.
3. Complete the [Release checklist](RELEASE_CHECKLIST.md).
4. Confirm that every committed and generated file is safe for public access.
5. Confirm that restricted links require authentication at their destination.

The `package.json` is marked `private` to prevent accidental publication to a package registry. It is used only for convenient local commands.

## GitHub Pages

The repository includes `.github/workflows/pages.yml`, which validates the public boundary before deploying the static root. To use it:

1. Create a new public repository from the sanitized template.
2. Push the files to a default branch named `main`.
3. Open the repository's **Settings**, then **Pages**.
4. Select **GitHub Actions** as the deployment source.
5. Open the **Actions** tab and confirm that **Deploy public demo to GitHub Pages** succeeds.
6. Open the environment URL reported by the deployment job.

If your default branch has another name, change the branch under `on.push.branches` in `.github/workflows/pages.yml`.

As a simpler alternative, remove or disable the Pages workflow and select branch deployment from the default branch and repository root. Use only one deployment method for a given site.

GitHub's interface and plan-specific options can change. Use the current Pages documentation if labels differ.

The site uses relative internal URLs, so it can run at a project path such as `https://ACCOUNT.github.io/REPOSITORY/`. Do not add leading slashes to repository-local links unless you intentionally want to point to the domain root.

The separate quality workflow validates contributions with read-only permissions. The Pages workflow grants deployment permissions only to its deploy job's workflow and runs the same checks before uploading the site.

## Other static hosts

For services such as an institutional static server, Cloudflare Pages, Netlify, or similar hosts:

- set the publish directory to the repository root;
- leave the build command empty;
- do not expose environment variables to client-side JavaScript;
- configure the host to serve `index.html` at the project root; and
- preserve the `vendor/katex/fonts` paths relative to `vendor/katex/katex.min.css`.

Some hosts offer password protection or identity-aware access at the edge. That may protect a deployment when correctly configured, but it is outside this template and does not make a public Git repository private. Keep restricted content in the institutionally approved system unless the host's access model has been reviewed.

## Custom domains

If you use a custom domain:

- configure HTTPS and enforce redirects from HTTP;
- verify domain ownership using the host's recommended method;
- avoid adding secret validation values to JavaScript;
- test both the root URL and deep links; and
- document who owns DNS and renewal responsibility.

## Post-deployment checks

Open the production site in a signed-out private window and verify:

- the dashboard title, instructor, and institution are correct;
- all five demo or replacement sessions open;
- presenter mode loads and keyboard navigation works;
- every reveal button and hint works;
- KaTeX expressions render without visible source delimiters;
- the OM Core Challenge works through all six questions, including a wrong-answer hint and the correct-answer solution;
- public asset links resolve;
- restricted links redirect to authentication;
- phone and desktop layouts remain usable;
- no mixed-content or console errors appear; and
- no unexpected files can be browsed through known deployment URLs.

Repeat this review after changing host configuration, paths, custom domains, or resource locations.

## Updating a deployed site

Use small pull requests and require the quality workflow to pass. Separate infrastructure changes from course-content changes when practical. After merging, verify the deployment rather than assuming a successful Git operation means the live site is correct.

If the course must remain stable during teaching, tag a known-good release and test changes in a preview deployment or fork before updating the learner-facing URL.

## Caching

Static hosts and browsers may cache JavaScript and CSS. If a learner sees stale content:

- confirm the deployment contains the new commit;
- hard-refresh or use a private window;
- inspect the network response rather than only the rendered page; and
- consult the host's cache-invalidation settings.

Do not solve caching by placing private tokens in asset URLs.
