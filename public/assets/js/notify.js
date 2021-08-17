
    loadDoc();
    setInterval(loadDoc, 7000);

    function loadDoc() {
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b_dt = JSON.parse(this.responseText);
                var x = document.getElementsByClassName("custombox-open");
                if(b_dt.action==="logout"){window.location.href = "/logout";}
                
                document.getElementById("referral_noti_count").innerHTML = b_dt.referral_count;
                document.getElementById("referral_noti").innerHTML=b_dt.referral_count;
                document.getElementById("health_noti").innerHTML=b_dt.pending_health_r;
                // if (b_dt.referral_count > 0 && x.length<1) {
                //     var sound= new Audio("/assets/sounds/alert.mp3");
                //     setTimeout(() => {
                //         document.getElementById("noti-modal").click();
                       
                        

                //     sound.play();
                //     }, 1000);


                // }

            } else {
                var b_dt = JSON.parse(this.responseText);
            }
        };
        xhttp.open("GET", "/noti-api", true);
        xhttp.send();
    }

   