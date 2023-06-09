let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";
    let q = document.getElementById("serach-box").value;
    let gifCount = 10;
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";
    fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
    console.log(info.data);
    let gifsData = info.data;
        gifsData.forEach((gif) => {
            let container = document.createElement("div");
            container.classList.add("container");
            let iframe = document.createElement("img");
            console.log(gif);
            iframe.setAttribute("src", gif.images.downsized_medium.url);
            iframe.onload = () => {
                gifCount--;
                if(gifCount == 0) {
                    loader.style.display = "none";
                    document.querySelector(".wrapper").style.display = "grid";
                }
            };
            container.append(iframe);
            let copyBtn = document.createElement("button");
            copyBtn.innerHTML = "Copy link";
            copyBtn.onclick = () => {
                let copylink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                navigator.clipboard.writeText(copylink).then(() => {
                    alert("GIF copied to clipboard");
                }).catch(() => {
                    alart("GIF copied to clipboard");
                    let hiddenInput = document.createElement("input");
                    hiddenInput.setAttribute("type", "text");
                    document.body.appendChild(hiddenInput);
                    hiddenInput.value = copyLink;
                    hiddenInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(hiddenInput);
                });
            }
            container.append(copyBtn);
            document.querySelector(".wrapper").appendChild(container);

        }) 
});
};
    
    
    
   
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);