
let catArray = []
let mood = ""
let affection = 5

/**
 This function is used to add individual cat data into the kittens array.
 The function also checks to see what the user has put in the form when submitting it.
 This is when the program checks the input to see if it is either blank 
 or if the user name already exists. 
 If either condition is true it will post a message to a user and have 
 them re-enter the form.
 If both conditions are false then it continues to push the new individual cat data
 into the array of kittens[] and draws the kittens out for the game to start
 */
function addCat(event) {
    event.preventDefault()

    let form = event.target

    let newCat = {
        id: createId(),
        name: form.name.value,
        mood: "tolerant",
        affection: 5,
    }
  /** this section attempts to check in the local storage if the entered
  username already exists. It does this by indexing through the kittens array
  and compares the kitten.name property to the form input.
  */

    for (let i = 0; i < catArray.length; i++) {
        if (catArray[i].name == form.name.value) {
            alert("you can't have kittens with the same name...they'll get confused")
            reset.form()
        }
    }

    if (form.name.value == "") {alert("you must enter a name for your kitten")}
 //this section checks to make sure that the value in the form being submitted isn't blank


    else
    catArray.push(newCat)
    saveCats()
    form.reset()
    drawCats()
}

/**
 This function converts the kittens array to a JSON string then
 saves the string to localstorage using the key kittens
 */
function saveCats() {
    window.localStorage.setItem("catArray", JSON.stringify(catArray))
    drawCats()
}
/**
 This function pulls the data from the local storage
 it uses JSON.parse to transform the data from string back to object
 if there is data in local storage it will set the kittens array to 
 the received array.
 */

function loadCats() {
    let catData = JSON.parse(window.localStorage.getItem("catArray"))
    if (catData) {
      catArray = catData
    }
}

/**
 This function draws all of the kittens data onto the kittens template.
 For each kitten it finds in the kittens array the code will add the mood, name, affection,
 and id of that kitten into the template so that it is visible to the user.
 */
 function drawCats() {
     loadCats()

     let catElem = document.getElementById("moody-cats")
     let catTemplate = ""

     catArray.forEach(newCat => {
         catTemplate +=
         `
         <div class="cat-border bg-dark kitten ${newCat.mood} text-light">
         <img class = "kitten" src = "https://robohash.org/${newCat.name}?set=set4&size=150x150">
         <div class = "d-flex justify-content-center">Name: ${newCat.name}</div>
         <div class = "d-flex justify-content-center">Mood: ${newCat.mood}</div>
         <div class = "d-flex justify-content-center">Affection: ${newCat.affection}</div>
         <div class="d-flex space-between"></div>
         <button class="btn-cancel m-1" onclick="pet('${newCat.id}')">Pet cat</button>
         <button class="m-1" onclick="catnip('${newCat.id}')">Catnip</button>
         <div class="d-flex justify-content-center"><i class="action fa fa-trash text-danger" onclick="removeCat('${newCat.id}')"></i></div>
         </div>
        </div>
         `
     }
     )
     catElem.innerHTML = catTemplate
}

/**
 This section finds the kitten in the array of kittens by its id
 */
 function findCatById (id) {
     return catArray.find(c => c.id == id);
 }

/**
 This function finds the kitten in the array of kittens
 then it generates a random Number.
 If the number is greater than .7
 increase the kittens affection. 
 If not, than it will decrease the affection.
 Once this is complete it will set the new mood for the kitten and save it.
 */
 function pet(id) {
     let currentCat = findCatById(id)
     let randomNum = Math.random()
    if (randomNum > .7){
        currentCat.affection ++;
        setCatMood (currentCat)
        saveCats()
    }

    else currentCat.affection --;
    setCatMood(currentCat)
    saveCats()
 }

 /**
 This function will find the kitten in the array of kittens.
 Then it will set the kitten's mood to tolerant and the kitten's affection to 5
 After those have been set it saves the kittens array so the new data can be presented.
 */
 function catnip(id) {
    let currentCat = findCatById(id)
    currentCat.mood = "tolerant"
    currentCat.affection = 5
    saveCats()
}

/**
 This section sets the kittens mood based on its affection.
 If the kitten is happy then affection > 6.
 If the kitten is tolerant affection <= 5.
 If the kitten is angry affection <= 3.
 If the kitten is gone affection <= 0.
 */
function setCatMood (newCat) {
document.getElementById("moody-cats").classList.remove(newCat.mood)

if (newCat.affection >= 6) { newCat.mood = "happy" }
if (newCat.affection <= 5) { newCat.mood = "tolerant" }
if (newCat.affection <= 3) { newCat.mood = "angry" }
if (newCat.affection <= 0) { newCat.mood = "gone" }

document.getElementById("moody-cats").classList.add(newCat.mood)
saveCats()
}

function startGame() {
    document.getElementById("welcome").remove();
    document.getElementById("add-div").classList.remove("hidden")
    drawCats()
}

/**
 This function resets all of the data in local storage.
 It's used to reset the game for the player
 */
function resetData() {
    if (window.localStorage.length == 0) { alert("You don't have any kittens to release. Press the 'Start Game' button to continue") }
    else
      localStorage.clear();
  }

  
/**
 This function generates a random string id for the local storage database
 */
  function createId() {
    return (
      Math.floor(Math.random() * 10000000) +
      "-" +
      Math.floor(Math.random() * 10000000)
    );
  }

  /**
 This function is used went the player wants to delete just one of their kittens
 Finds id of kitten then uses the splice function to remove that id from the kittens array.
 */
  function removeCat(id) {
      let index = catArray.findIndex(newCat => newCat.id == id)
      catArray.splice(index,1)
      saveCats()
  }
