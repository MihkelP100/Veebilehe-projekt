const maintext = document.getElementById("textbox_main");

const button_in = document.getElementById("addto_in");

const list_in = document.getElementById("list_in");

function add_to_list(ln) {
    const li = document.createElement("li");
    const list = document.getElementById(ln);
    
    li.textContent = maintext.value;

    list.appendChild(li);

}