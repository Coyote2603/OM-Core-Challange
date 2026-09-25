#!/usr/bin/env node
// Validates js/om-challenge.js: the OM Core Challenge question data.
// Run with `npm test` (also included in `npm run check`).

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");
const errors = [];
const relativePath = "js/om-challenge.js";

function readClassicScript(exportExpression) {
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

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${label} must be a non-empty string`);
  }
}

const questions = readClassicScript("OM_CHALLENGE_QUESTIONS");

if (questions !== undefined) {
  if (!Array.isArray(questions) || questions.length === 0) {
    errors.push("OM_CHALLENGE_QUESTIONS must be a non-empty array");
  } else {
    const seenIds = new Set();

    questions.forEach((question, index) => {
      const label = `OM_CHALLENGE_QUESTIONS[${index}]`;

      if (typeof question.id !== "number") {
        errors.push(`${label}.id must be a number`);
      } else if (seenIds.has(question.id)) {
        errors.push(`${label}.id (${question.id}) is duplicated`);
      } else {
        seenIds.add(question.id);
      }

      requireNonEmptyString(question.kicker, `${label}.kicker`);
      requireNonEmptyString(question.title, `${label}.title`);
      requireNonEmptyString(question.context, `${label}.context`);
      requireNonEmptyString(question.question, `${label}.question`);

      if (!Array.isArray(question.options) || question.options.length !== 4) {
        errors.push(`${label}.options must be an array of exactly 4 options`);
        return;
      }

      const seenKeys = new Set();
      let correctCount = 0;

      question.options.forEach((option, optionIndex) => {
        const optionLabel = `${label}.options[${optionIndex}]`;

        requireNonEmptyString(option.key, `${optionLabel}.key`);
        if (option.key && seenKeys.has(option.key)) {
          errors.push(`${optionLabel}.key ("${option.key}") is duplicated within this question`);
        } else if (option.key) {
          seenKeys.add(option.key);
        }

        requireNonEmptyString(option.text, `${optionLabel}.text`);

        if (typeof option.correct !== "boolean") {
          errors.push(`${optionLabel}.correct must be a Boolean`);
          return;
        }

        if (option.correct) {
          correctCount++;
          requireNonEmptyString(option.solution, `${optionLabel}.solution (required on the correct option)`);
          if (option.hint) {
            errors.push(`${optionLabel} is marked correct but also has a "hint" — remove it, only "solution" belongs here`);
          }
        } else {
          requireNonEmptyString(option.hint, `${optionLabel}.hint (required on every incorrect option)`);
          if (option.solution) {
            errors.push(`${optionLabel} is marked incorrect but also has a "solution" — remove it, only "hint" belongs here`);
          }
        }
      });

      if (correctCount !== 1) {
        errors.push(`${label} must have exactly 1 option with correct: true (found ${correctCount})`);
      }
    });
  }
}

const topicSummary = readClassicScript("OM_TOPIC_SUMMARY");
if (topicSummary !== undefined) {
  if (!Array.isArray(topicSummary) || topicSummary.length === 0) {
    errors.push("OM_TOPIC_SUMMARY must be a non-empty array");
  } else {
    topicSummary.forEach((entry, index) => {
      requireNonEmptyString(entry.title, `OM_TOPIC_SUMMARY[${index}].title`);
      requireNonEmptyString(entry.body, `OM_TOPIC_SUMMARY[${index}].body`);
    });
  }
}

// A syntactically valid JS string can still contain a single (unescaped)
// backslash, which breaks KaTeX delimiters in a template literal — same
// check validate-content.mjs runs on js/content.js.
{
  const filePath = path.join(repoRoot, relativePath);
  if (fs.existsSync(filePath)) {
    const source = fs.readFileSync(filePath, "utf8");
    const malformedBackslash = /(^|[^\\])\\(?!\\)/gm.exec(source);
    if (malformedBackslash) {
      const line = source.slice(0, malformedBackslash.index).split("\n").length;
      errors.push(`${relativePath}:${line} contains a single backslash; double backslashes in JavaScript strings, including every KaTeX delimiter`);
    }
  }
}

if (errors.length > 0) {
  console.error(`OM Core Challenge validation failed with ${errors.length} error(s):\n`);
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
} else {
  console.log(`OM Core Challenge validation passed: ${questions.length} questions, all well-formed.`);
}
