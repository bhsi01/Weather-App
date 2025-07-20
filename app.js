const api="168771779c71f3d64106d8a88376808a";   //this is the api id

// this function gets the json data of api and returns it 
async function getData() { 
    try {
        const city=document.querySelector("#city").value;
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
        console.log(url);
        const response=await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data=await response.json();
        return data;
    }
    catch(e) {
        document.querySelector(".showdata").innerHTML="No data found";
        return null;
    }
}

// this function dislays the data in the screen 
function displayData(data) {

    console.log(data);

    let showData=document.querySelector(".showdata");

    let img=document.createElement("img");
    img.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    showData.append(img);

    let dataHTML=`
    <h2>Weather in - ${document.querySelector("#city").value}</h2>
    <img src="${img.src}">
    <p>Clouds :  ${data.weather[0].description}</p>
    <p>Temperature :  ${data.main.temp}</p>
    <p>Humidity :  ${data.main.humidity} %</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    showData.innerHTML=dataHTML;

}

// this event listener calls both functions 
document.querySelector("#submit").addEventListener("click",async ()=>{
    console.log("button clicked");
    let data=await getData();
    displayData(data);
});