window.onload = function () {
    init();
};

function init() {
    // const boton= document.getElementById('toggle-menu');
    // const menu= document.getElementById('menu');
    // boton.addEventListener('click', ()=>menu.classList.toggle('menu-boton-show'));
    // document.getElementById('video-intro').play();

    document.getElementById('chk_acepto').checked = false;
    escogeTexto();

    window.addEventListener("scroll", (event) => {
        let w_pos_scroll = this.scrollY;
        let w_alto_vw = window.innerHeight || document.body.clientHeight;
        let w_barra_menu = document.getElementById('barra-menu');
        if (w_pos_scroll >= w_alto_vw) {
            w_barra_menu.style.backgroundColor = "whitesmoke";
        } else {
            w_barra_menu.style.backgroundColor = "";
        }
    });


    //Control de cookies
    let w_cookie = getCookie("printCustom_visitas");
    if (w_cookie != "") {      
        let w_visitas = parseInt(w_cookie) +1;
        setCookie("printCustom_visitas", w_visitas, 365);
    } else {
        preguntarCookies();
    }
}

function escogeTexto() {
    let w_textos = new Array();
    w_textos[0] = "Imprimiendo tus sueños";
    w_textos[1] = "Centro de Impresión";
    let w_aleat = Math.floor(Math.random()  * w_textos.length);
    document.getElementById('txt_centro').innerText = w_textos[w_aleat];
}

//cuando pulsa el check de aceptar condiciones...
function activaEnviar() {
    let chk_acepto = document.getElementById('chk_acepto');
    let btn_enviar = document.getElementById('btn_enviar');
    if (chk_acepto.checked) {
        btn_enviar.disabled = false;
    } else {
        btn_enviar.disabled = true;
    }
}

//Muestra la pregunta sobre cookies y oculta momentáneamente las RRSS
function preguntarCookies() {
    let bloqueMsg = document.getElementById("cookies");
    bloqueMsg.style.display = "flex";
    let bloqueSocial = document.getElementById("social");
    bloqueSocial.style.display = "none";
}

function rechazarCookies() {
    let bloqueMsg = document.getElementById("cookies");
    bloqueMsg.parentNode.removeChild(bloqueMsg);
    let bloqueSocial = document.getElementById("social");
    bloqueSocial.parentNode.removeChild(bloqueSocial);
}

function aceptaCookies() {
    // let w_ip = obtenerIP();
    // setCookie("printCustom_ip", w_ip, 30);
    setCookie("printCustom_visitas", 1, 365);
    let bloqueMsg = document.getElementById("cookies");
    bloqueMsg.parentNode.removeChild(bloqueMsg);
    let bloqueSocial = document.getElementById("social");
    bloqueSocial.style.display = "block";
}

//----------------------------------------------------------------

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=Lax;path=/";
}

function removeCookie(cname){
    setCookie(cname,"",-1);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function llamadaHttp(yourUrl){
    let Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function obtenerIP() {
    let json_obj = JSON.parse(llamadaHttp("https://api.ipify.org?format=json"));
    console.log("this is the author name: "+json_obj.ip);
    return json_obj.ip;

    /*
    <script type="application/javascript">
        function getIP(json) {
            document.write("My public IP address is: ", json.ip);
        }
    </script>
    <script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
*/
}
