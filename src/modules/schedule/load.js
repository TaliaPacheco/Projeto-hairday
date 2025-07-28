import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { hoursLoad  } from "../form/hour-load.js"
import { schedulesShow } from "../schedule/show.js"

const selectedDate = document.getElementById("date")

export async function schedulesDay () { 
    //obtem a data do input.
    const date = selectedDate.value

    //Busca na API os agendamentos. 
    const dailySchedules = await scheduleFetchByDay({ date })

    //Exibe os agendamentos.
    schedulesShow({ dailySchedules })
     
    //renderiza as horas disponiveis.
    hoursLoad({date, dailySchedules})
}  