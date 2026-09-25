#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const errors = [];

function walkFiles(directory, predicate, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(target, predicate, output);
    else if (entry.isFile() && predicate(target)) output.push(target);
  }
  return output;
}

function readClassicScript(relativePath, exportExpression) {
  const filePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing ${relativePath}`);
    return undefined;
  }
  const source = fs.readFileSync(filePath, "utf8");
  const context = vm.createContext({ console });
  try {
    vm.runInContext(`${source}\nglobalThis.__VALUE__ = ${exportExpression};`, context, {
      filename: relativePath
    });
    return context.__VALUE__;
  } catch (error) {
    errors.push(`${relativePath} could not be evaluated: ${error.message}`);
    return undefined;
  }
}

function requireString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${label} must be a non-empty string`);
  }
}

function validateLocalReference(reference, label) {
  if (!reference || /^https:\/\//i.test(reference)) return;
  if (/^(?:[a-z]+:|\/|\\|\.\.\/)/i.test(reference)) {
    errors.push(`${label} must be a repository-relative path or an https URL`);
    return;
  }
  const clean = reference.split(/[?#]/)[0];
  const resolved = path.resolve(repoRoot, clean);
  if (!resolved.startsWith(repoRoot + path.sep)) {
    errors.push(`${label} escapes the repository root`);
    return;
  }
  if (!fs.existsSync(resolved)) {
    errors.push(`${label} points to missing file ${clean}`);
  }
}

const site = readClassicScript("js/site-config.js", "SITE_CONFIG");
const sessions = readClassicScript("js/content.js", "SESSIONS");

if (site) {
  for (const key of ["siteTitle", "shortTitle", "courseTitle", "courseSubtitle", "footerText"]) {
    requireString(site[key], `SITE_CONFIG.${key}`);
  }
  for (const key of ["instructorName", "institutionName"]) {
    if (site[key] !== undefined && typeof site[key] !== "string") {
      errors.push(`SITE_CONFIG.${key} must be a string when provided`);
    }
  }
  if (typeof site.features?.showGame !== "boolean") {
    errors.push("SITE_CONFIG.features.showGame must be a Boolean");
  }
  if (!site.theme || !/^#[0-9a-f]{6}$/i.test(site.theme.primary || "")) {
    errors.push("SITE_CONFIG.theme.primary must be a six-digit hex color");
  }
  if (!site.theme || !/^#[0-9a-f]{6}$/i.test(site.theme.accent || "")) {
    errors.push("SITE_CONFIG.theme.accent must be a six-digit hex color");
  }
  if (!site.theme || !/^#[0-9a-f]{6}$/i.test(site.theme.accentText || "")) {
    errors.push("SITE_CONFIG.theme.accentText must be a six-digit hex color");
  }
  if (site.features?.showGame) {
    requireString(site.game?.title, "SITE_CONFIG.game.title");
    requireString(site.game?.description, "SITE_CONFIG.game.description");
    requireString(site.game?.duration, "SITE_CONFIG.game.duration");
    requireString(site.game?.href, "SITE_CONFIG.game.href");
    validateLocalReference(site.game?.href, "SITE_CONFIG.game.href");
  }
}

if (!Array.isArray(sessions) || sessions.length === 0) {
  errors.push("SESSIONS must be a non-empty array");
} else {
  const numbers = new Set();
  const slugs = new Set();
  const slideTypes = new Set(["title", "concept", "formula", "step", "table", "diagram", "image"]);

  sessions.forEach((session, sessionIndex) => {
    const label = `SESSIONS[${sessionIndex}]`;
    if (!Number.isInteger(session.number) || session.number < 1) {
      errors.push(`${label}.number must be a positive integer`);
    } else if (numbers.has(session.number)) {
      errors.push(`${label}.number duplicates session ${session.number}`);
    } else {
      numbers.add(session.number);
    }
    requireString(session.slug, `${label}.slug`);
    if (typeof session.slug === "string") {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(session.slug)) {
        errors.push(`${label}.slug must use lowercase kebab-case`);
      } else if (slugs.has(session.slug)) {
        errors.push(`${label}.slug duplicates ${session.slug}`);
      } else {
        slugs.add(session.slug);
      }
    }
    requireString(session.title, `${label}.title`);
    requireString(session.kicker, `${label}.kicker`);
    requireString(session.summary, `${label}.summary`);
    if (!Array.isArray(session.objectives) || session.objectives.length === 0) {
      errors.push(`${label}.objectives must be a non-empty array`);
    }
    (session.objectives || []).forEach((objective, objectiveIndex) => {
      requireString(objective, `${label}.objectives[${objectiveIndex}]`);
    });

    for (const key of ["concepts", "diagrams", "materials", "problems", "readings", "teachingSlides"]) {
      if (!Array.isArray(session[key])) errors.push(`${label}.${key} must be an array`);
    }

    (session.concepts || []).forEach((concept, conceptIndex) => {
      const conceptLabel = `${label}.concepts[${conceptIndex}]`;
      requireString(concept.marker, `${conceptLabel}.marker`);
      requireString(concept.title, `${conceptLabel}.title`);
      requireString(concept.body, `${conceptLabel}.body`);
    });

    (session.diagrams || []).forEach((diagram, diagramIndex) => {
      const diagramLabel = `${label}.diagrams[${diagramIndex}]`;
      requireString(diagram.title, `${diagramLabel}.title`);
      requireString(diagram.html, `${diagramLabel}.html`);
      if (diagram.caption !== undefined) requireString(diagram.caption, `${diagramLabel}.caption`);
    });

    (session.materials || []).forEach((material, materialIndex) => {
      const materialLabel = `${label}.materials[${materialIndex}]`;
      requireString(material.label, `${materialLabel}.label`);
      requireString(material.type, `${materialLabel}.type`);
      requireString(material.description, `${materialLabel}.description`);
      requireString(material.url, `${materialLabel}.url`);
      if (material.optional !== undefined && typeof material.optional !== "boolean") {
        errors.push(`${materialLabel}.optional must be a Boolean when provided`);
      }
      validateLocalReference(material.url, `${materialLabel}.url`);
    });

    (session.problems || []).forEach((problem, problemIndex) => {
      const problemLabel = `${label}.problems[${problemIndex}]`;
      requireString(problem.title, `${problemLabel}.title`);
      requireString(problem.level, `${problemLabel}.level`);
      requireString(problem.context, `${problemLabel}.context`);
      if (!Array.isArray(problem.parts) || problem.parts.length === 0) {
        errors.push(`${problemLabel}.parts must be a non-empty array`);
      }
      (problem.parts || []).forEach((part, partIndex) => {
        requireString(part.question, `${problemLabel}.parts[${partIndex}].question`);
        requireString(part.solution, `${problemLabel}.parts[${partIndex}].solution`);
      });
    });

    (session.readings || []).forEach((reading, readingIndex) => {
      requireString(reading.label, `${label}.readings[${readingIndex}].label`);
      requireString(reading.url, `${label}.readings[${readingIndex}].url`);
      validateLocalReference(reading.url, `${label}.readings[${readingIndex}].url`);
    });

    (session.teachingSlides || []).forEach((slide, slideIndex) => {
      const slideLabel = `${label}.teachingSlides[${slideIndex}]`;
      if (!slideTypes.has(slide.type)) errors.push(`${slideLabel}.type is unsupported`);
      requireString(slide.title, `${slideLabel}.title`);
      requireString(slide.content, `${slideLabel}.content`);
      if (slide.hints !== undefined && !Array.isArray(slide.hints)) {
        errors.push(`${slideLabel}.hints must be an array when provided`);
      }
      (slide.hints || []).forEach((hint, hintIndex) => {
        const hintLabel = `${slideLabel}.hints[${hintIndex}]`;
        requireString(hint.label, `${hintLabel}.label`);
        requireString(hint.content, `${hintLabel}.content`);
      });
    });
  });

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const expectedNumbers = Array.from({ length: sessions.length }, (_, index) => index + 1);
  if (sortedNumbers.join(",") !== expectedNumbers.join(",")) {
    errors.push(`Session numbers must be contiguous from 1 to ${sessions.length}`);
  }
}

const contentPath = path.join(repoRoot, "js/content.js");
if (fs.existsSync(contentPath)) {
  const contentSource = fs.readFileSync(contentPath, "utf8");
  const malformedBackslash = /(^|[^\\])\\(?!\\)/gm.exec(contentSource);
  if (malformedBackslash) {
    const line = contentSource.slice(0, malformedBackslash.index).split("\n").length;
    errors.push(`js/content.js:${line} contains a single backslash; double backslashes in JavaScript strings, including every KaTeX delimiter and command`);
  }
}

for (const page of ["index.html", "session.html", "present.html", "om-challenge.html"]) {
  if (!fs.existsSync(path.join(repoRoot, page))) errors.push(`Missing ${page}`);
}

for (const pagePath of walkFiles(repoRoot, file => file.endsWith(".html"))) {
  const page = path.relative(repoRoot, pagePath).split(path.sep).join("/");
  const html = fs.readFileSync(pagePath, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    if (!clean) continue;
    const resolved = path.resolve(path.dirname(pagePath), clean);
    if (!resolved.startsWith(repoRoot + path.sep) || !fs.existsSync(resolved)) {
      errors.push(`${page} references missing local file ${clean}`);
    }
  }
}

for (const cssPath of walkFiles(repoRoot, file => file.endsWith(".css"))) {
  const css = fs.readFileSync(cssPath, "utf8");
  const cssLabel = path.relative(repoRoot, cssPath).split(path.sep).join("/");
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const reference = match[1].trim();
    if (/^(?:https?:|data:|#)/i.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    const resolved = path.resolve(path.dirname(cssPath), clean);
    const vendoredWoff2Fallback = /\.(?:woff|ttf)$/i.test(resolved)
      && fs.existsSync(resolved.replace(/\.(?:woff|ttf)$/i, ".woff2"));
    if (!resolved.startsWith(repoRoot + path.sep) || (!fs.existsSync(resolved) && !vendoredWoff2Fallback)) {
      errors.push(`${cssLabel} references missing local file ${clean}`);
    }
  }
}

for (const markdownPath of walkFiles(repoRoot, file => file.endsWith(".md"))) {
  const markdown = fs.readFileSync(markdownPath, "utf8");
  const markdownLabel = path.relative(repoRoot, markdownPath).split(path.sep).join("/");
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const rawReference = match[1].trim().replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|tel:|#)/i.test(rawReference)) continue;
    const clean = decodeURIComponent(rawReference.split("#")[0]);
    if (!clean) continue;
    const resolved = path.resolve(path.dirname(markdownPath), clean);
    if (!resolved.startsWith(repoRoot + path.sep) || !fs.existsSync(resolved)) {
      errors.push(`${markdownLabel} references missing local file ${clean}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Content validation failed\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed for ${sessions.length} sessions.`);
