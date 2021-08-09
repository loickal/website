const cookieBox = document.querySelector(".cookiewrapper"),
acceptBtn = cookieBox.querySelector("button");


let checkCookie = document.cookie.indexOf("AcceptedMhamCookie=True"); //checking our cookie
//if cookie is set then hide the cookie box else show it
if(checkCookie != -1){
  cookieBox.classList.add("hide") 
}else{
  cookieBox.style.opacity = 1;
  cookieBox.classList.remove("hide");
}


acceptBtn.onclick = ()=>{
  document.cookie = "AcceptedMhamCookie=True max-age="+60*60*24*30;
  if(document.cookie){ //if cookie is set
    cookieBox.classList.add("hide"); //hide cookie box
    cookieBox.style.opacity = 0;
  }else{ //if cookie not set then alert an error
    alert("Hmm... Looks like you don't want that, the cookies are with you! Please enable cookies!");
  }
}
