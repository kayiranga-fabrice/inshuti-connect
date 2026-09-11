// Zero-dependency local store — replaces Supabase for demo purposes.
// All data lives in the browser's localStorage under the key "ic-questions".

export type Question = {
  id: string;
  code: string;
  message: string;
  category: string;
  age_range: string | null;
  status: "pending" | "answered";
  response: string | null;
  created_at: string;
};

const KEY = "ic-questions";

function load(): Question[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(questions: Question[]) {
  localStorage.setItem(KEY, JSON.stringify(questions));
}

export function addQuestion(q: Omit<Question, "id" | "created_at">): Question {
  const questions = load();
  const entry: Question = {
    ...q,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  save([entry, ...questions]);
  return entry;
}

export function getByCode(code: string): Question | null {
  return load().find((q) => q.code === code.toUpperCase().trim()) ?? null;
}

export function getAll(): Question[] {
  return load();
}

export function updateQuestion(id: string, patch: Partial<Question>): boolean {
  const questions = load();
  const idx = questions.findIndex((q) => q.id === id);
  if (idx === -1) return false;
  questions[idx] = { ...questions[idx], ...patch };
  save(questions);
  return true;
}

export function deleteQuestion(id: string): boolean {
  const questions = load();
  const next = questions.filter((q) => q.id !== id);
  if (next.length === questions.length) return false;
  save(next);
  return true;
}
