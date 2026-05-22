"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockWorkouts = [
  { id: 1, name: "Back Squat", sets: 4, reps: 5, weight: "100kg" },
  { id: 2, name: "Romanian Deadlift", sets: 3, reps: 8, weight: "80kg" },
  { id: 3, name: "Leg Press", sets: 3, reps: 12, weight: "150kg" },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-6">Workout Diary</h1>

      <div className="mb-6">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-56 justify-start gap-2">
              <CalendarIcon className="h-4 w-4" />
              {format(date, "do MMM yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                if (d) {
                  setDate(d);
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <h2 className="text-lg font-semibold mb-3">
        Workouts for {format(date, "do MMM yyyy")}
      </h2>

      {mockWorkouts.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No workouts logged for this date.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {mockWorkouts.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-1">
                <CardTitle className="text-base">{workout.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {workout.sets} sets × {workout.reps} reps @ {workout.weight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
