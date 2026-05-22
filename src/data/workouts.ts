import { and, eq, gte, lt } from 'drizzle-orm';
import { startOfDay, endOfDay } from 'date-fns';

import { db } from '@/db';
import { workouts } from '@/db/schema';

export async function getWorkoutsForDate(userId: string, date: Date) {
  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      gte(workouts.startedAt, startOfDay(date)),
      lt(workouts.startedAt, endOfDay(date))
    ),
    with: {
      workoutExercises: {
        with: {
          exercise: true,
          sets: true,
        },
        orderBy: (we, { asc }) => [asc(we.order)],
      },
    },
  });
}
