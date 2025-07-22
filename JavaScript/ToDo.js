const res = document.querySelector(".firstOut");
const res2 = document.querySelector(".secondOut");
const Maxbtn = document.querySelector("button");
const btn1 = document.querySelector(".insert");
const btn2 = document.querySelector(".view");
const btn3 = document.querySelector(".del");
const btn4 = document.querySelector(".delall");
const yourData = document.querySelector("h3")
const Table = document.querySelector("table");
const Tr = document.querySelector("thead");
const Td = document.querySelector("tbody");
const Maxcon = document.querySelector(".container");

//Input
let inpTime = btn1.addEventListener("click", () => {
    yourData.classList = "H3";
    res.classList = "outVisible";
    res2.classList = "outVisible";
    res.innerText = "Total Item:"
    res2.innerText = (localStorage.length)
    Table.classList = "";
    setTimeout(() => {
        let inp = prompt("Enter the value you want:");
        let inp2 = prompt("Enter the second value you want:");
        localStorage.setItem(inp, inp2);
        res2.innerText = (localStorage.length)
        btn4.removeEventListener("click", TableData);
    }, 2000)
});

// View data

let clkTime = 0;
btn2.addEventListener("click", TableData);

function TableData() {
    clkTime++;
    console.log(clkTime)
    yourData.classList = "H3"
    res.classList = "outVisible";
    res2.classList = "outVisible";
    Table.classList = "outVisible";
    Maxbtn.classList = "butnmax";
    Maxcon.classList = "contaMax"
    Td.innerHTML = "";
    var allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
    }
    Object.entries(allData).forEach(([key, value]) => {
        const row = document.createElement("tr");

        const tdKey = document.createElement("td");
        tdKey.textContent = key;

        const tdValue = document.createElement("td");
        tdValue.textContent = value;

        row.appendChild(tdKey);
        row.appendChild(tdValue);
        Td.appendChild(row);
        res.innerText = "Total Item:";
        res2.innerText = (localStorage.length);
    });
}

// Delete

btn3.addEventListener("click", () => {
    if (localStorage.length == 0) {
        alert("Empty Data Set...");
    }
    else {
        let key = prompt("Enter the name you want to remove:");
        if (key in localStorage) {
            UpdateTableData(key);
            res2.innerText = (localStorage.length);
        }
        else {
            alert("Data not matched..");
        }
    }
})

function UpdateTableData(Item) {
    for (let i = 0; i < Td.rows.length; i++) {
        const row = Td.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            const cellData = row.cells[j].textContent;
            if (Item === cellData) {
                Td.removeChild(Td.rows[i])
                localStorage.removeItem(Item);
                break;
                // console.log(`Row ${i}, Cell ${j}: ${cellData}`);
            }
        }
    }
}


// DeleteAll
btn4.addEventListener("click", () => {
    if (localStorage.length == 0) {
        alert("Empty Data Set...")
    }
    else {
        let key = confirm("Are you sure to delete all data?")
        if (key) {
            localStorage.clear();
        }
        res.classList = "outVisible";
        res2.classList = "outVisible";
        res.innerText = "Total Item:";
        res2.innerText = (localStorage.length)
        Td.remove()
        Tr.classList = "";
    }
})
