function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json() )
    .then(cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta 
// pegar todos os items da lista

const itemsToCollect = document.querySelectorAll(".items-grid li") 

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //add or remove a class with JS
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

   

    //Verificar se existem itens selecionados, se sim
    //Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //verifica se é true ou falso
        return itemFound //retorna a variável
    })

    //se já estiver selecionado
    if(alreadySelected >= 0){
        //tirar da selecao
        const filteredItems = selectedItems.filter(item => {
            itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
        
    } else {
        //se não estiver selecionado
        //adicionar a selecao
        selectedItems.push(itemId)  
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}

