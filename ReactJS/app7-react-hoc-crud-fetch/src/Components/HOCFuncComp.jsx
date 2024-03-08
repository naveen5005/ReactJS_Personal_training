import React, { useState } from 'react'

const HOCFuncComp = (OriginalComp) => {
    const NewComp = () => {
        const[persons,setPersons] = useState([])
        const commonServerCommunication = async (method, payload) => {
            let url;
            method === "POST" || method === "GET" ? url = "http://localhost:3001/persons" : url = "http://localhost:3001/persons/" + payload.id
            var results = await (await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: method === "POST" || method === "PUT" ? JSON.stringify(payload) : null
            })).json();
            if (method === "GET") {
                setPersons(results);
            }
        }
        return <OriginalComp
            commonServerCommunication={commonServerCommunication}
            persons={persons}
        />
    }


    return NewComp
}

export default HOCFuncComp
