window.addEventListener('load',()=>{
    let lat;
    let long;
    const locationtimezone = document.querySelector(".timezone");
    const temp = document.querySelector("#number");
    const tempdesc = document.querySelector(".tempdesc");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api=`${[proxy]}https://api.darksky.net/forecast/3e5cf181d1e8abc234c31dc235f4f537/${lat},${long}`;
            console.log(api)
            fetch(api)
                .then(data => {
                    return data.json();
                   } )
                .then(response => {
                    console.log(response)
                    const {temperature,summary,icon} = response.currently;
                    temp.textContent=temperature;
                    locationtimezone.textContent=response.timezone;
                    tempdesc.textContent=summary;
                    setIcon(icon,document.querySelector(".icon"))

                })
        })
        
    } 
    function setIcon(icon,iconID) {
        const skycons = new Skycons({color:"white"})
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play()
        return skycons.set(iconID,Skycons[currentIcon])
        
    }
})

