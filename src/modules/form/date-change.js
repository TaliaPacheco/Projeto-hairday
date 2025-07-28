import { schedulesDay } from "../schedule/load"
//Seleciona o input de data.
const selectedDate = document.getElementById("date")

//Recarrega a ista de horarios quando o input mudar.
selectedDate.onchange = () => schedulesDay() 
