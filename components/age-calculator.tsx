'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { differenceInYears, differenceInMonths, differenceInDays, format } from 'date-fns';
import { toast } from 'sonner';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css'; // or another theme if you prefer

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(1990, 0, 1));
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      const flatpickrInstance = Flatpickr(datePickerRef.current, {
        defaultDate: birthDate,
        maxDate: new Date(),
        dateFormat: 'F j, Y',
        onChange: (selectedDates) => {
          setBirthDate(selectedDates[0] || undefined);
        }
      });

      return () => {
        flatpickrInstance.destroy();
      };
    }
  }, []);

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
            <input
              ref={datePickerRef}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Select date"
              data-input
            />
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