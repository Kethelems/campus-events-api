import { NextFunction, Request, Response } from 'express';
import { canRegister } from '../domain/events';
import { HttpError } from '../errors';

export const registerForEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body as { userId: string };

    // TODO: replace with real DB queries
    const event = await getEventById(eventId);
    const registrations = await getRegistrationsByEventId(eventId);

    const result = canRegister({ capacity: event.capacity, registrations, userId });

    if (!result.allowed) {
      throw new HttpError(400, result.reason);
    }

    await createRegistration({ eventId, userId });
    res.status(201).json({ eventId, userId });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// Stubs — substitua pelas queries reais quando o banco estiver configurado
// ---------------------------------------------------------------------------
async function getEventById(eventId: string): Promise<{ capacity: number }> {
  void eventId;
  throw new HttpError(404, 'event not found');
}

async function getRegistrationsByEventId(eventId: string): Promise<string[]> {
  void eventId;
  return [];
}

async function createRegistration(data: { eventId: string; userId: string }): Promise<void> {
  void data;
}
