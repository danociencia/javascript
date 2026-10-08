const pasillo = ["S", ".", "#", ".", ".", "."]

function posicionRobot(pasillo){
    let robot = 0
    let orden
    const mensajes = []

    for(let i=0; i<pasillo.length; i++){
        if(pasillo[i] === "S"){
            robot = i
        }
    }

    do {
        orden = prompt("Indica hacia donde quieres que se mueva" +
        "\n1. Izquierda" +
        "\n2. Derecha" +
        "\n3. Salir")

        switch(orden){
            case "1":
                if(pasillo[robot-1] === "#"){
                    alert("izquierda: rechazado; hay un obstáculo en la posición " + (robot-1))
                    mensajes.push("izquierda: rechazado; hay un obstáculo en la posición " + (robot-1))

                }else if(pasillo[robot-1] == null){
                    alert("izquierda: rechazado; el destino queda fuera del pasillo")
                    mensajes.push("izquierda: rechazado; el destino queda fuera del pasillo")

                }else{
                    pasillo[robot-1] = "S"
                    pasillo[robot] = "."
                    robot--
                    alert("aceptado, posición " + robot)
                }
            break

            case "2":
                if(pasillo[robot+1] === "#"){
                    alert("derecha: rechazado; hay un obstáculo en la posición " + (robot+1))
                    mensajes.push("derecha: rechazado; hay un obstáculo en la posición " + (robot+1))

                }else if(pasillo[robot+1] == null){
                    alert("derecha: rechazado; el destino queda fuera del pasillo")
                    mensajes.push("derecha: rechazado; el destino queda fuera del pasillo")

                }else{
                    pasillo[robot+1] = "S"
                    pasillo[robot] = "."
                    robot++
                    alert("aceptado, posición " + robot)
                }
            break

            case "3":
                alert("Adios!")
            break

            default:
                alert("opción no válida")
        }

    } while(orden !== "3")

    for (let mensaje of mensajes){
        document.body.innerHTML += mensaje + "<br>"
    }

    document.body.innerHTML += pasillo
}

posicionRobot(pasillo)