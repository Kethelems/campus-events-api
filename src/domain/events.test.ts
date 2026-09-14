import { describe, expect, it } from 'vitest';
import { validateEventInput } from './events';

describe('validateEventInput', () => {
  it('accepts a valid event', () => {
    const input = { name: 'Semana Acadêmica', date: '2026-09-16', capacity: 30 };
    const result = validateEventInput(input);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it.each([
    [{ name: '', date: '2026-09-16', capacity: 10 }, 'name is required'],
    [{ name: 'JS Day', capacity: 10 }, 'date is required'],
    [{ name: 'JS Day', date: '2026-09-16', capacity: 0 }, 'capacity must be greater than zero'],
    [{ name: 'JS Day', date: '2026-09-16', capacity: -1 }, 'capacity must be greater than zero'],
    [{ name: 'JS Day', date: '2026-09-16', capacity: '10' }, 'capacity must be greater than zero'],
  ])('rejects invalid event input %#', (input, expectedError) => {
    const result = validateEventInput(input);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(expectedError);
  });

  it('accepts the boundary value capacity = 1', () => {
    const input = { name: 'Meetup', date: '2026-10-01', capacity: 1 };
    const result = validateEventInput(input);
    expect(result.valid).toBe(true);
  });

  it('rejects capacity = 0', () => {
    const input = { name: 'Meetup', date: '2026-10-01', capacity: 0 };
    const result = validateEventInput(input);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('capacity must be greater than zero');
  });
});
