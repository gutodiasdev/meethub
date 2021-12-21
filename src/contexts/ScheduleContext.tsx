import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createContext, ReactNode, useState } from "react";

type ScheduleContextData = {
  getDaysOfWeek: () => void
}

type ScheduleContextProps = {
  children: ReactNode
}

export const ScheduleContext = createContext({} as ScheduleContextData)

export function ScheduleProvider({ children }: ScheduleContextProps) {

  function getDaysOfWeek(): string[] {
    const startOfTheWeek = startOfWeek(new Date())
    const weekDays = Array.from(Array(7)).map(
      (e, i) => format(addDays(startOfTheWeek, i), 'eee', { locale: ptBR })
    )

    return weekDays
  }

  return (
    <ScheduleContext.Provider value={{ getDaysOfWeek }}>
      {children}
    </ScheduleContext.Provider>
  )
}