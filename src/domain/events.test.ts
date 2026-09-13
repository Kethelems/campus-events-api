import { describe, expect, it } from 'vitest';
import { canRegister } from './events';

describe('canRegister', () => {
  it('allows registration when there is capacity and user is not registered', () => {
    // Arrange
    const args = { capacity: 10, registrations: ['user-1', 'user-2'], userId: 'user-3' };

    // Act
    const result = canRegister(args);

    // Assert
    expect(result).toEqual({ allowed: true });
  });

  it('denies registration when user is already registered (duplicate)', () => {
    // Arrange
    const args = { capacity: 10, registrations: ['user-1', 'user-2'], userId: 'user-1' };

    // Act
    const result = canRegister(args);

    // Assert
    expect(result).toEqual({ allowed: false, reason: 'duplicate' });
  });

  it('denies registration when event is at full capacity', () => {
    // Arrange
    const args = { capacity: 2, registrations: ['user-1', 'user-2'], userId: 'user-3' };

    // Act
    const result = canRegister(args);

    // Assert
    expect(result).toEqual({ allowed: false, reason: 'full' });
  });

  it('allows registration when there is exactly one spot remaining', () => {
    // Arrange
    const args = { capacity: 3, registrations: ['user-1', 'user-2'], userId: 'user-3' };

    // Act
    const result = canRegister(args);

    // Assert
    expect(result).toEqual({ allowed: true });
  });
});
