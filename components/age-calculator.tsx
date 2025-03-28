'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { differenceInYears, differenceInMonths, differenceInDays, parse, format } from 'date-fns';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(1990, 0, 1)); // Default to Jan 1, 1990
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    try {
      if (!birthDate) {
        toast.error('Please select a birth date');
        return;
      }

      const today = new Date();

      if (birthDate > today) {
        toast.error('Birth date cannot be in the future');
        return;
      }

      const years = differenceInYears(today, birthDate);
      const months = differenceInMonths(today, birthDate) % 12;
      const days = differenceInDays(today, birthDate) % 30;

      setAge({ years, months, days });
    } catch (error) {
      toast.error('Please enter a valid date');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Enter your birth date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  initialFocus
                  defaultMonth={birthDate}
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  captionLayout="dropdown-buttons"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={calculateAge} className="w-full">
            Calculate Age
          </Button>
        </div>

        {age && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{age.years}</div>
              <div className="text-sm text-muted-foreground">Years</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{age.months}</div>
              <div className="text-sm text-muted-foreground">Months</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{age.days}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}