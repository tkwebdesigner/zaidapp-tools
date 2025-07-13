'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarDays, Clock, Cake, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: Date;
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(1990, 0, 1));
  const [result, setResult] = useState<AgeResult | null>(null);
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
  }, [birthDate]);

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

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      // Adjust for negative months or days
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
        days += Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24));
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate total days
      const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

      // Calculate next birthday
      const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      setResult({
        years,
        months,
        days,
        totalDays,
        nextBirthday,
      });
    } catch (error) {
      toast.error('Please enter a valid date');
    }
  };

  const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Enter your birth date</Label>
            <div className="flex gap-2">
              <input
                ref={datePickerRef}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Select date"
                data-input
              />
              <Button onClick={calculateAge} disabled={!birthDate}>
                Calculate
              </Button>
            </div>
          </div>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={CalendarDays}
                label="Years"
                value={result.years}
              />
              <StatCard
                icon={Clock}
                label="Months"
                value={result.months}
              />
              <StatCard
                icon={Cake}
                label="Days"
                value={result.days}
              />
              <StatCard
                icon={Calendar}
                label="Next Birthday"
                value={result.nextBirthday.toLocaleDateString()}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}