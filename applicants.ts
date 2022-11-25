import assert from "assert";
import { readFileSync, writeFileSync } from "fs";

interface Case {
  applicants: number;
  budget: number;
  salaries: number[];
}

function readFileV1(filename: string): Case[] {
  function parseCase(row1: string, row2: string): Case {
    const [k, budget] = row1.split(" ").map((v) => +v);
    const salaries = row2.split(" ").map((v) => +v);

    assert(k === salaries.length);

    return { applicants: k, budget, salaries };
  }

  const file = readFileSync(filename, "utf-8");
  const [caseCounttr, ...lines] = file.split("\n");
  const caseCount = +caseCounttr;

  assert(+caseCount === lines.length / 2);

  const cases = [];
  for (let i = 0; i < caseCount; i++) {
    cases.push(parseCase(lines[2 * i], lines[2 * i + 1]));
  }

  return cases;
}

function calculateMaxHire(caze: Case): number {
  const { budget, salaries } = caze;
  const SortedSalaries = salaries.sort((a, b) => a - b);

  let maxHire = 0;
  let sumSalary = 0;
  for (let i = 0; i < SortedSalaries.length; i++) {
    sumSalary += SortedSalaries[i];
    if (sumSalary <= budget) {
      maxHire++;
    } else {
      break;
    }
  }

  return maxHire;
}

function writeFileV1(filename: string, lines: number[]) {
  writeFileSync(filename, lines.join("\n"));
}

const cases = readFileV1("data");
const nos = cases.map((c) => calculateMaxHire(c));
writeFileV1("result", nos);
