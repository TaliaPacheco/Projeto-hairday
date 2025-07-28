import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { hourClick } from "./hour-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }){

    hours.innerHTML = ""

    //obtem a lista de horarios ocupados.
    const unavailableHours = dailySchedules.map((schedule) => 
        dayjs(schedule.when).format("HH:mm") )
    
    const opening = openingHours.map((hour) => {
        //recupera somente a hora
        const [scheduleHour] = hour.split(":")

        //adiciona a hora na date e verifica se esta no passado.
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

        const available = !unavailableHours.includes(hour) && !isHourPast

        return{
            hour, 
            available,
        }
    })

    opening.forEach(({ hour, available }) => {
        const li = document.createElement("li")

        li.classList.add("hour")
        li.classList.add(available ? "hour-available" : "hour-unavailable")

        li.textContent = hour

        if(hour === "9:00"){
            hourHeaderAdd("Manhã")
        }else if(hour === "13:00"){
            hourHeaderAdd("tarde")
        }else if(hour === "18:00"){
            hourHeaderAdd("noite")
        }

        hours.append(li)
    })
    
    hourClick()
}

function hourHeaderAdd(title){
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = title

    hours.append(header)
}