class Nota{
    constructor({titulo, contenido}){
        this.titulo=titulo;
        this.contenido=contenido
    }
    
}


class NotasApp{
    constructor(){
        this.notas=JSON.parse(localStorage.getItem("misNotas")) || [];
        this.formulario=document.querySelector("#formulario")
        this.listaNotas=document.querySelector("#lista-notas");
        this.formulario.addEventListener("submit", this.agregarNota.bind(this));
        this.listaNotas.addEventListener("click", this.seleccionarNota.bind(this));
    
        this.dibujarNotas();
    }

    agregarNota(e){
        e.preventDefault();
        const data=Object.fromEntries(new FormData(e.target));
        const nota=new Nota(data);
        this.notas.unshift(nota);
        localStorage.setItem("misNotas", JSON.stringify(this.notas));
        this.dibujarNotas();
        this.formulario.reset();
        
    }

    dibujarNotas(){
        this.listaNotas.innerHTML="";
        this.notas.forEach((nota, indice) => {
            const divNota=document.createElement("div");
            divNota.classList.add("nota");
            divNota.insertAdjacentHTML("beforeend", `
            <h2>${nota.titulo}</h2>
            <p>${nota.contenido}</p>
            <div class="botones">
              <button class="boton-editar custom-btn btn-1" data-indice="${indice}">Editar</button>
              <button class="boton-eliminar custom-btn btn-1" id_nota="${indice}">Eliminar</button>
            </div>
          `)
          this.listaNotas.appendChild(divNota);
        });
        
    }

    seleccionarNota(e){
        const boton=e.target;
        if(boton.classList.contains("boton-eliminar")){
            const id=boton.getAttribute("id_nota")
            this.notas.splice(id, 1);
            localStorage.setItem("misNotas", JSON.stringify(this.notas));
            this.dibujarNotas();
        }else if(boton.classList.contains("boton-editar")){
            const id=boton.dataset.indice;
            const nota=this.notas[id];
            console.log(nota);
        }
    }


}

const app=new NotasApp();