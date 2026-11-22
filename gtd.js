const maintext = document.getElementById("textbox_main");

const button_in = document.getElementById("addto_in");

const list_in = document.getElementById("list_in");

const listData = {
    in: [],
    test: []
}

let tegevused = JSON.parse(localStorage.getItem("GTD_listid")) || listData;
let valitud = null;

function salvesta() {
    localStorage.setItem("GTD_listid", JSON.stringify(tegevused))
}

//maintext.addEventListener("textbox_main"


function add_to_list(ln, sta) {
    const li = document.createElement("li");
    const list = document.getElementById(ln);
    if (maintext.value != "") {
        li.textContent = maintext.value;

        list.appendChild(li);
    }
}