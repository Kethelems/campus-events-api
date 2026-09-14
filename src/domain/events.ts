export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateEventInput(input: unknown): ValidationResult {
  const errors: string[] = [];
  const event = input as Record<string, unknown>;

  if (typeof event.name !== 'string' || !event.name.trim()) {
    errors.push('name is required');
  }

  if (typeof event.date !== 'string' || !event.date.trim()) {
    errors.push('date is required');
  }

  if (!Number.isInteger(event.capacity) || Number(event.capacity) <= 0) {
    errors.push('capacity must be greater than zero');
  }

  return { valid: errors.length === 0, errors };
}
