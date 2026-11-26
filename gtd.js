const maintext = document.getElementById("text_main");

const button_in = document.getElementById("addto_in");

const list_in = document.getElementById("list_in");

//localStorage.clear();
const listData = {
    in: [],
    next: [],
    waiting: [],
    project: []
}

let tegevused = JSON.parse(localStorage.getItem("GTD_listid")) || listData;
let valitudTekst = null;

function salvesta() {
    localStorage.setItem("GTD_listid", JSON.stringify(tegevused))
}

//maintext.addEventListener("textbox_main"


function add_to_list(listname, sta) {
    const li = document.createElement("li");
    const list = document.getElementById(listname);
    if (maintext.value != "") {
        li.textContent = maintext.value;

        list.appendChild(li);
    }
}

function loadList(listname) {
    const list = document.getElementById("list_" + listname);
    list.innerHTML = "";

    tegevused[listname].forEach((tekst, indeks) => {
        const listitem = document.createElement("li")
        listitem.textContent = tekst;

        if (valitudTekst !== null && valitudTekst.nimi === listname && valitudTekst.indeks === indeks) {
            listitem.classList.add("selected");
        }
        console.log(valitudTekst);

        listitem.addEventListener("click", () => select(listname, indeks));
        list.appendChild(listitem);
    });

    
}
function reloadall() {
    Object.keys(tegevused).forEach(loadList);
}

function buttons() {
    //väär kui textbox on tühi
    const aaa = maintext.value !== "";
    const nähtav = valitudTekst !== null;
    document.getElementById("edit").hidden = !nähtav;
    document.getElementById("remove").hidden = !nähtav;

    Object.keys(tegevused).forEach(nimi => {
        const nupp = document.getElementById(nimi + "_add");
        nupp.hidden = !(aaa || (valitudTekst !== null && valitudTekst.nimi !== nimi))
    });
}

function select(nimi, indeks) {
    const mem = valitudTekst;

    if (mem !== null && mem.nimi === nimi && mem.index === indeks) {
        valitudTekst = null;
    }
    else {
        valitudTekst = { nimi, indeks};
    }

    loadList(nimi);
    if (mem !== null && mem.nimi !== nimi) {
        loadList(mem.nimi);
    }
    buttons();
    //console.log(nimi, indeks, valitudTekst)
}

function add(s) {
    const tekst = maintext.value;

    if (tekst !== "") {
        tegevused[s].push(tekst);
        salvesta();
        loadList(s);

        maintext.value = "";
        buttons()
    }
    else if (valitudTekst !== null && valitudTekst !== s) {
        const tekst2 = tegevused[valitudTekst.nimi].splice(valitudTekst.indeks, 1)[0];

        tegevused[s].push(tekst2);
        v = valitudTekst.nimi
        valitudTekst = null;

        salvesta();
        loadList(v);
        loadList(s);
        buttons();
    }
}
function edit() {
    if (!valitudTekst) {
        return;
    }
    // mingi lahendus vaja mõelda

    salvesta();
}
function del() {
    if (!valitudTekst) {
        return;
    }

    tegevused[valitudTekst.nimi].splice(valitudTekst.indeks,1);
    valitudTekst = null;
    salvesta();
    reloadall();
    buttons();
}
//mingi hoiatus lisada
function clearall() {
    localStorage.clear();
    reloadall()
}

maintext.addEventListener("input", buttons);
reloadall();
buttons();