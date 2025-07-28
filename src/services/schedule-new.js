import { apiConfig } from "./api-config.js";

export async function scheduleNew({ id, name, when}){
    try{
        //Faz a requisição para enviar os dados de agendamento.
        await fetch(`${apiConfig.baseURL}/schedules`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, name, when}),
        })

        alert("Agendamento realizado com sucesso!")
    }catch(error){
        alert("Não foi possivel agendar. Tente novamente mais tarde")
    }
}