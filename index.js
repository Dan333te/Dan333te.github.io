const ham = document.querySelector("#ham");
const dropUL = document.querySelector("#navMenu");
const home = document.querySelector("#Home");
const home2 = document.querySelector("#Home2");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const targetElement = entry.target;


    targetElement.classList.add("show", entry.isIntersecting);

   
  });
});


const cardObserver = new IntersectionObserver(
  (entries) => {
    console.log(entries)
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
         
      }
    });
  },
 
);

// Target cards
const cards = document.querySelectorAll(".contactCard");
cards.forEach((card) => {
  cardObserver.observe(card);
});
// Observe each card
if (window.innerWidth <= 1232) {
  cards.forEach((card) => {
    card.classList.toggle("visible");
  });
}

const homeLeft = document.querySelector(".home-left");
observer.observe(homeLeft);

const homeImg = document.getElementById("Home-img");

function handleAnimation() {
  if (window.innerWidth <= 993) {
    homeImg.style.animation = "none"; // Stop the animation
  } else {
    homeImg.style.animation =
      "moveLeftRight 5s cubic-bezier(0.4, 2.6, 0.2, 0.9) infinite alternate"; // Restart the animation
  }
}

// Initially check and set the animation based on the window width
handleAnimation();

// Listen for window resize events to update the animation
window.addEventListener("resize", handleAnimation);

ham.addEventListener("click", () => {
  ham.classList.toggle("active");
  dropUL.classList.toggle("active");
});
const homesec = document.querySelector("#HomeSec");
home.addEventListener("click", () => {
  homesec.scrollIntoView({ behavior: "smooth" });
});

const servSec = document.querySelector("#services");
document.querySelector("#dropdown").addEventListener("click", () => {
  servSec.scrollIntoView({ behavior: "smooth" });
});
const btns = document.querySelectorAll("#learn");
btns.forEach((e) => {
  e.addEventListener("mouseup", (event) => {
    window.location.href = "./Services/Services.html";
  });
});
document.addEventListener('DOMContentLoaded',()=>{
let algorithms=document.querySelectorAll('.learn')
algorithms.forEach((ele,key)=>{
  ele.addEventListener('click',(e)=>{

    let algorithm=e.target.getAttribute('href').substring(1)
    document.getElementById('algorithmSelect').value = algorithm;


  })



})


})