import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"
const periods = document.querySelectorAll(".period")

//Gera evento de clique para cada lista (manhã, tarde e noite)
periods.forEach((period) =>{

    //captura o evento de clique na lista.
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")){

            //obtem a li pai do elemento clicado.
            const item = event.target.closest("li")

            //pega o id do agendamento para remover
            const { id } = item.dataset
            
            //confirma que o id foi selecionado.
            if(id){

                //confirma se o usuario quer cancelar.
                const isConfirm = confirm(
                    "Tem certeza que deseja cancelar o agendamento?"
                )

                if (isConfirm){
                    //faz a requisicao na API pra cancelar.
                   await scheduleCancel({ id })

                   //recarrega os agendamentos.
                   schedulesDay()
                }
            }
        }
    })
})
