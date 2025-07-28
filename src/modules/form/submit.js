import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import {schedulesDay} from "../schedule/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

//data atual
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//carrega a data atual
selectedDate.value = inputToday

//define a data minima como sendo a atual.
selectedDate.min = inputToday

form.onsubmit = async (event) => {
    //Previne o comportamento padrão de carregar da pagina.
    event.preventDefault()

    try{
        //recupera o nome do cliente.
        const name = clientName.value.trim()
        if(!name){
            return alert("informe o nome do cliente!")
        }

        //recupera o horario selecionado.
        const hourSelected = document.querySelector(".hour-selected")

        if(!hourSelected){
            return alert("Selecione uma hora!")
        }

        //recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")

        //insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")

        //Gera um ID.
        const id = new Date().getTime() 
        
        await scheduleNew({
            id,
            name,
            when,
        })
        //recarrega os agendamentos 
        await schedulesDay ()
        //limpa o input de nome do cliente.
        clientName.value = ""
    }catch (error){
        alert("Não foi possivel realizar o agendamento")
    }
}