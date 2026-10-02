const cardFields = ['title', 'question', 'answer', 'topic', 'tags'] as const;
const cardFieldSet: ReadonlySet<string> = new Set(cardFields);

export interface CardInput {
  title: string;
  question: string;
  answer: string;
  topic: string;
  tags: string[];
}

export type CardChanges = Partial<CardInput>;

export interface CardRow {
  id: string;
  userId: string;
  title: string;
  question: string;
  answer: string;
  topic: string;
  tags: string;
  status: string;
}

export function serializeTags(tags: string[]): string {
  return JSON.stringify(tags.map((tag) => tag.trim()).filter(Boolean));
}

export function parseTags(tags: string): string[] {
  try {
    const parsed: unknown = JSON.parse(tags);
    return Array.isArray(parsed)
      ? parsed.filter((tag): tag is string => typeof tag === 'string')
      : [];
  } catch {
    return [];
  }
}

export function toCardResponse(card: CardRow) {
  return {
    id: card.id,
    title: card.title,
    question: card.question,
    answer: card.answer,
    topic: card.topic,
    tags: parseTags(card.tags),
    isDraft: card.status === 'draft',
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseCardInput(value: unknown, partial = false): CardChanges | null {
  if (!isRecord(value) || Object.keys(value).some((key) => !cardFieldSet.has(key))) {
    return null;
  }

  const changes: CardChanges = {};
  for (const field of cardFields) {
    if (!Object.hasOwn(value, field)) {
      if (!partial) return null;
      continue;
    }

    const fieldValue = value[field];
    if (field === 'tags') {
      if (!Array.isArray(fieldValue) || !fieldValue.every((tag) => typeof tag === 'string')) {
        return null;
      }
      changes.tags = fieldValue.map((tag) => tag.trim()).filter(Boolean);
    } else {
      if (typeof fieldValue !== 'string' || !fieldValue.trim()) {
        return null;
      }
      changes[field] = fieldValue.trim();
    }
  }

  return Object.keys(changes).length > 0 ? changes : null;
}

export function parseDraftInput(value: unknown): CardInput | null {
  if (!isRecord(value) || Object.keys(value).some((key) => !cardFieldSet.has(key))) {
    return null;
  }

  const textField = (field: Exclude<keyof CardInput, 'tags'>): string | null => {
    const fieldValue = value[field];
    if (fieldValue === undefined) return '';
    return typeof fieldValue === 'string' ? fieldValue.trim() : null;
  };

  const title = textField('title');
  const question = textField('question');
  const answer = textField('answer');
  const topic = textField('topic');
  const tags = value.tags ?? [];
  if (
    title === null ||
    question === null ||
    answer === null ||
    topic === null ||
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === 'string')
  ) {
    return null;
  }

  return {
    title,
    question,
    answer,
    topic,
    tags: tags.map((tag) => tag.trim()).filter(Boolean),
  };
}

export function isCompleteCard(input: CardChanges): input is CardInput {
  return cardFields.every((field) => Object.hasOwn(input, field));
}