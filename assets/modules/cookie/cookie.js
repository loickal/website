const cookieBox = document.querySelector(".cookiewrapper"),
acceptBtn = cookieBox.querySelector("button");

if(localStorage.getItem("cookie_accepted") == null){
  cookieBox.style.opacity = 1;
  cookieBox.classList.remove("hide");
}else{
  cookieBox.classList.add("hide") 
}


acceptBtn.onclick = ()=>{
  document.cookie = "AcceptedMhamCookie=True max-age="+60*60*24*30;
  localStorage.setItem("cookie_accepted", true);
  if(document.cookie){ //if cookie is set
    cookieBox.classList.add("hide"); //hide cookie box
    cookieBox.style.opacity = 0;
  }else{ //if cookie not set then alert an error
    alert("Hmm... Looks like you don't want that the cookies are with you! Please enable cookies!");
  }
}
