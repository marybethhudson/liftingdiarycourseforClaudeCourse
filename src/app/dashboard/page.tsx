import { auth } from "@clerk/nextjs/server";
import { format, parseISO } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkoutsForDate } from "@/data/workouts";
import { DatePicker } from "./_components/DatePicker";

type SearchParams = Promise<{ date?: string }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { userId } = await auth();
  const { date: dateParam } = await searchParams;

  const date = dateParam ? parseISO(dateParam) : new Date();
  const workouts = userId ? await getWorkoutsForDate(userId, date) : [];

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-6">Workout Diary</h1>

      <div className="mb-6">
        <DatePicker selected={date} />
      </div>

      <h2 className="text-lg font-semibold mb-3">
        Workouts for {format(date, "do MMM yyyy")}
      </h2>

      {workouts.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No workouts logged for this date.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {workouts.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-1">
                <CardTitle className="text-base">{workout.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {workout.workoutExercises.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No exercises logged.</p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {workout.workoutExercises.map((we) => (
                      <li key={we.id} className="text-sm text-muted-foreground">
                        {we.exercise.name} — {we.sets.length} set{we.sets.length !== 1 ? "s" : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
