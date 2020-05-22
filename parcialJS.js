var http = new XMLHttpRequest;
var trClick;
function contenedorAparecer(){
    document.getElementById("containerAgregar").hidden=false;
}
function contenedorDesaparecer(){
    document.getElementById("containerAgregar").hidden=true;
}
function loadingAparecer(){
    document.getElementById("load").hidden=false;
}
function loadingDesaparecer(){
    document.getElementById("load").hidden=true;
}

window.onload=function(){
    this.GetMaterias();
}

function armarGrilla(jsonObj){
    for(var i=0;i<jsonObj.length;i++){
        
        document.getElementById("fname").className = "sinError";
        document.getElementById("Cuatrimestre").className = "sinError";
        document.getElementById("fecha").className = "sinError";
        //document.getElementById("turno").className = "sinError";
        // tr.setAttribute("idPersona",jsonObj[i].id);
        agregarObjeto(jsonObj[i])
        /* // nodoTexto
        tCuerpo.innerHTML+=
        "<tr>"+
        "<td>"+jsonObj[i].nombre +"</td>"+
        "<td>"+jsonObj[i].apellido +"</td>"+
        "<td>"+jsonObj[i].fecha +"</td>"+
        "<td>"+jsonObj[i].telefono +"</td>"+
        "<td><a href=''>borrar</a></td>"+
        "</tr>";*/
        
    }
}
function agregarObjeto(objeto){
    var tCuerpo = document.getElementById("tCuerpo");
    var tr =document.createElement("tr");
    tr.setAttribute("idMateria",objeto.id);
    //Agrega una row
    var td =document.createElement("td");
    var nodoTexto1 = document.createTextNode(objeto.nombre);
    td.appendChild(nodoTexto1);
    tr.appendChild(td); //agrego la row a la tabla 

    var td2 =document.createElement("td");
    var nodoTexto2 = document.createTextNode(objeto.cuatrimestre);
    td2.appendChild(nodoTexto2);
    tr.appendChild(td2); //agrego la row a la tabla 

    var td3 =document.createElement("td");
    var nodoTexto3 = document.createTextNode(objeto.fechaFinal);
    td3.appendChild(nodoTexto3);
    tr.appendChild(td3); //agrego la row a la tabla 

    var td4 =document.createElement("td");
    var nodoTexto4 = document.createTextNode(objeto.turno);
    td4.appendChild(nodoTexto4);
    tr.appendChild(td4); //agrego la row a la tabla 

    
    tr.addEventListener("dblclick",clickGrilla);
    tCuerpo.appendChild(tr);
}
function agregarPersona(objeto){
        var tCuerpo = document.getElementById("tCuerpo");
        var tr =document.createElement("tr");
        tr.setAttribute("idMateria",objeto.id);
        //Agrega una row
        var td =document.createElement("td");
        var nodoTexto1 = document.createTextNode(objeto.nombre);
        td.appendChild(nodoTexto1);
        tr.appendChild(td); //agrego la row a la tabla 

        var td2 =document.createElement("td");
        var nodoTexto2 = document.createTextNode(objeto.apellido);
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2); //agrego la row a la tabla 

        var td3 =document.createElement("td");
        var nodoTexto3 = document.createTextNode(objeto.fecha);
        td3.appendChild(nodoTexto3);
        tr.appendChild(td3); //agrego la row a la tabla 

        
        var td4 =document.createElement("td");
        var nodoTexto4 = document.createTextNode(objeto.sexo);
        td4.appendChild(nodoTexto4);
        tr.appendChild(td4); //agrego la row a la tabla 

        
        tr.addEventListener("dblclick",clickGrilla);
        tCuerpo.appendChild(tr);
}

function GetMaterias(){
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            //console.log(http.responseText);
            obj =JSON.parse(http.responseText) 
            armarGrilla(obj);
        }
    }
    http.open("GET","http://localhost:3000/materias",true);
    http.send();
}
function clickGrilla(e){
    trClick = e.target.parentNode;
    //console.log(e);
    //console.log(e.target.parentNode.childNodes[0].innerHTML);//esto me da una lista de tds
    //document.getElementById("nombre") = trClick.childNodes[0].innerHTML;
    contenedorAparecer();
    document.getElementById("fname").value = trClick.childNodes[0].textContent;
    switch(trClick.childNodes[1].textContent){
        case "1":
            document.getElementById("Cuatrimestre").value = 1;
            break;
        case "2":
            document.getElementById("Cuatrimestre").value = 2;
            break;
        case "3": 
            document.getElementById("Cuatrimestre").value = 3;
            break;
        case "4":
            document.getElementById("Cuatrimestre").value = 4;
            break;
    }
    document.getElementById("Cuatrimestre").setAttribute("disabled","disabled");
    document.getElementById("fecha").value = toFech(trClick.childNodes[2].textContent);
    if(trClick.childNodes[3].textContent == "Mañana")
    {
        document.getElementById("mañana").checked = true;
    }
    else{
        document.getElementById("noche").checked = true;
    }
    var btnModificar = document.getElementById("btnModificar");
    // trClick.removeChild(trClick.childNodes[0]);
    
}

function toFech(fecha){

            let data= new Date();
           /* alert(document.getElementById("fecha").value);*/
            var fechaEnArray = fecha.split("/");//Divide un string en un array delimitado por -
            //osea nos da un array de 3 donde en el index 0 esta el año, 1 el mes y 2 el dia
            data.setFullYear(fechaEnArray[2]);
            //Los meses para un date arrancan de 0. Si los tenemos que setear -1 y cuando los mostramos +1
            data.setMonth(fechaEnArray[1]-1);
            data.setDate(fechaEnArray[0]);
            //alert(data.getFullYear() + "/" + data.getMonth() +"/" + data.getDate());
           // return data.getFullYear() + "-" + (data.getMonth()+1) +"-" + data.getDate();
           return fechaEnArray[2]+"-"+fechaEnArray[1]+"-"+fechaEnArray[0];
        }
function toFechInverso(fecha){
    let data= new Date();
     var fechaEnArray = fecha.split("-");//Divide un string en un array delimitado por -
    return fechaEnArray[2]+"/"+fechaEnArray[1]+"/"+fechaEnArray[0];
}
function Modificar(){
     if(ValidarDatos()==true){
            ejecutarModificar();
        }

}

function actualizarElemento(){
    trClick.childNodes[0].textContent = document.getElementById("fname").value;
    trClick.childNodes[2].textContent = toFechInverso(document.getElementById("fecha").value);
    
    if(document.getElementById("mañana").checked == true)
    {
        trClick.childNodes[3].textContent = "Mañana"
       }
       else{
           trClick.childNodes[3].textContent = "Noche"
       }
}
function ValidarDatos(){
    var nombre = document.getElementById("fname");
    var fecha = document.getElementById("fecha");
    var fechaMod = new Date(fecha.value);

    if(nombre.value == "" || nombre.value.length <= 6){
        nombre.className = "error";
        return false;
    }
    if(fecha.value == "" || fechaMod.getTime() < Date.now()){
        fecha.className = "error";
        return false;
    }

    return true;

}
function ejecutarPost(nombre,apellido,fecha,telefono){
    contenedorDesaparecer();
    loadingAparecer();
    var httpPost = new XMLHttpRequest();
    httpPost.onreadystatechange=function(){        
        if(httpPost.readyState==4 && httpPost.status == 200){
            console.log(httpPost.responseText);
            //location.reload();
            loadingDesaparecer();
            contenedorAparecer();
        }
    }
    httpPost.open("POST","http://localhost:3000/nuevaPersona",true);
    httpPost.setRequestHeader("Content-Type","application/json");
    //var json ={"nombre":nombre,"apellido":apellido,"fecha":fecha,"telefono":telefono};
    var json ={"nombre":nombre,"apellido":apellido,"fecha":fecha,"telefono":telefono};
    httpPost.send(JSON.stringify(json));
    //CONTROL-C podes matar la api via console
    /// PONER UN GIFT CARGANDO Y CUANDO YA VUELVA EL SERVIDOR SACAR EL GIFT Y RECARGAR LA GRILLA CON LA RESPUESTA DEL SERVIDOR 
}
function ejecutarModificar(){
    document.getElementById("contenedorGlobal").hidden=true;
    loadingAparecer();
    var respuesta;
    var httpPost = new XMLHttpRequest();
    httpPost.onreadystatechange=function(){        
        if(httpPost.readyState==4 ){
            loadingDesaparecer();
            document.getElementById("contenedorGlobal").hidden=false;
            contenedorDesaparecer();          
            respuesta = JSON.parse(httpPost.responseText);
            if(respuesta.type == "ok")
                {
                  actualizarElemento();  
                }
                //console.log(httpPost.responseText);
                //location.reload();
            
        }
    }
    
    httpPost.open("POST","http://localhost:3000/editar",true);
    httpPost.setRequestHeader("Content-Type","application/json");
    var json = {
        "id": trClick.getAttribute("idMateria"),
        "nombre": document.getElementById("fname").value,
        "cuatrimestre": trClick.childNodes[1].textContent,
        "fechaFinal": toFechInverso(document.getElementById("fecha").value),
        "turno": document.getElementById("noche")?"Noche":"Mañana"
    }
    //var json ={"id":id,"nombre":nombre,"apellido":apellido,"fecha":fecha,"sexo":sexo};
    //var json ={"nombre":nombre,"apellido":apellido,"fecha":fecha,"telefono":telefono};
    httpPost.send(JSON.stringify(json));
    //CONTROL-C podes matar la api via console
    /// PONER UN GIFT CARGANDO Y CUANDO YA VUELVA EL SERVIDOR SACAR EL GIFT Y RECARGAR LA GRILLA CON LA RESPUESTA DEL SERVIDOR 
}

function ejecutarEliminar(){
    document.getElementById("contenedorGlobal").hidden = true;
    loadingAparecer();
    var respuesta;
    var httpPost = new XMLHttpRequest();
        httpPost.onreadystatechange=function(){

            if(httpPost.readyState == 4){
                respuesta = JSON.parse(httpPost.responseText);
                if(respuesta.type == "ok"){
                  //  console.log(respuesta.type);
                trClick.remove();
                }
                
                loadingDesaparecer();
                document.getElementById("contenedorGlobal").hidden = false;
            }

        }
        httpPost.open("POST", "http://localhost:3000/eliminar", true);
        httpPost.setRequestHeader("Content-Type", "application/json");

        var json = {
            "id": trClick.getAttribute("idMateria"),
        }
        httpPost.send(JSON.stringify(json));
        contenedorDesaparecer();
}

