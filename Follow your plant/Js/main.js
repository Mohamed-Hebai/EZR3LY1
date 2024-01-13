let SiteName=document.querySelector("#SiteName")
let SiteURL=document.querySelector("#SiteURL")
let Sites=[];
let btn=document.querySelector("#submit");
let tbody=document.querySelector("tbody");
let nameRgx=/^[a-zA-Z]{3,}$/;
var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
// console.log(nameRgx.test('ghy1'));

if(JSON.parse(localStorage.getItem("Sites"))){
    Sites=JSON.parse(localStorage.getItem("Sites"));
    displaysites();
}

btn.addEventListener("click",function(){
    if(nameRgx.test(SiteName.value) && httpRegex.test(SiteURL.value)){
        let newsite={
            Name:SiteName.value,
            URL:SiteURL.value
            }
        Sites.push(newsite);
        localStorage.setItem("Sites",JSON.stringify(Sites));
        displaysites();
        clearInputs();
    }else{
         document.querySelector(".layer").classList.replace("d-none","d-flex");
    }
    
   
})

function displaysites(){
    let cartona="";
    for(let i=0;i<Sites.length;i++){
        cartona+=
        ` <tr>
        <td>${i+1}</td>
        <td>${Sites[i].Name}</td>
        <td><a class="btn btn-success" href="${Sites[i].URL}" Target="_blank">Visit</a></td>
        <td><button onclick="Deletesite(${i})" class="btn btn-danger">Delete</button></td>
         </tr>
        `
    }
    tbody.innerHTML=cartona
}

function Deletesite(index){
Sites.splice(index,1);
localStorage.setItem("Sites",JSON.stringify(Sites))
displaysites();
}

function clearInputs(){
    SiteName.value="";
    SiteURL.value="";
}

function closeLayer(){
    document.querySelector(".layer").classList.replace("d-flex","d-none");
}