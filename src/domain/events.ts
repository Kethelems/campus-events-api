type CanRegisterArgs = {
  capacity: number;
  registrations: string[];
  userId: string;
};

type CanRegisterResult =
  | { allowed: true }
  | { allowed: false; reason: 'duplicate' | 'full' };

export const canRegister = ({ capacity, registrations, userId }: CanRegisterArgs): CanRegisterResult => {
  if (registrations.includes(userId)) {
    return { allowed: false, reason: 'duplicate' };
  }
  if (registrations.length >= capacity) {
    return { allowed: false, reason: 'full' };
  }
  return { allowed: true };
};
