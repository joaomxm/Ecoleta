
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then( res=>{return res.json()})
    .then((states)=>{

        for (state of states){
            
            ufSelect.innerHTML +=`<option value='${state.id}'>${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelectValue = document.querySelector('select[name=cityValue]')
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const ufValue= event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    
    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then((res)=>{return res.json()})
    .then((cities)=>{
        

        for(city of cities){
            console.log(city.nome);
            
            
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
          
        }

        citySelect.disabled = false

    })    
    
}

document.querySelector('select[name=uf]').addEventListener("change",getCities)

// itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect){
    item.addEventListener('click',handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')


let selectedItems = []


function handleSelectedItem(event){
    const itemLi = event.target

    //add or remove a class with JS
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    const alreadySelected = selectedItems.findIndex((item)=>{
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter((item)=>{
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems
        
        
    }
    else{
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
    
}