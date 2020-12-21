const cafeList = document.querySelector("#cafe-list");

//2. Adding data from the form to firestore
const form = document.querySelector("#add-cafe-form")
//end of step 2

//Create element and render cafe

function renderCafe(doc){
    let li = document.createElement("li");
    let name = document.createElement("span");
    let city = document.createElement("span");
    //creting a cross to delete the data from database
    let cross = document.createElement("div")

    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    //adding cross
    cross.textContent = "x";


    li.appendChild(name);
    li.appendChild(city);
    //adding it to list
    li.appendChild(cross);

    cafeList.appendChild(li);
    console.log(li);


    //deleting data
    cross.addEventListener('click', (e)=> {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection("cafes").doc(id).delete();
    })

}

//getting data
db.collection('cafes').get().then((snapshot) => {
    console.log(snapshot.docs);
    console.log("---------------snapshot.docs----------------");
    snapshot.docs.forEach(doc => {      
        console.log(doc.data());
        renderCafe(doc);
    })
})

//saving data
form.addEventListener("submit", (e)=> {
    //on click of a button page was geting refreshed whic we dont want so we are doing this.
    e.preventDefault();
    console.log("---------------Button Pressed----------------");  
    db.collection("cafes").add({
        name : form.name.value,
        city : form.city.value, 
    });
    //till this point data is been added but its not reflected in the webpage.
    form.name.value = "";
    form.city.value = "";
})