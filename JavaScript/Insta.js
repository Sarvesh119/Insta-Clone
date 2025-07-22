
const user = document.querySelector("#User");
const pass = document.querySelector("#Pass");
const login = document.querySelector(".butt");
const forget = document.querySelector(".butt1");
const createN = document.querySelector(".Acco");

function MEvent(e) {
    e.style.backgroundColor = "#413a3aff";
    e.style.fontWeight = "bold"
}
function NoEvent(e) {
    e.style.backgroundColor = "";
    e.style.fontWeight = ""
}

user.addEventListener("mouseover", () => {
    MEvent(user)
})
user.addEventListener("mouseout", () => {
    NoEvent(user)
})

pass.addEventListener("mouseover", () => {
    MEvent(pass)
})
pass.addEventListener("mouseout", () => {
    NoEvent(pass)
})

function authenticate() {
    if (user.value !== "" && pass.value !== "") {
        if (user.value in localStorage) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key === user.value) {
                    value = localStorage.getItem(key);
                    if (pass.value === value) {
                        // console.log(key, value);
                        user.value = ""
                        pass.value = ""
                        window.open("https://www.instagram.com", "_blank");            
                        // alert("You are Logged-in\nWelcome to Instagram");
                        break;
                    }
                    else {
                        alert("Wrong Password..");
                    }
                }
            }
        }
        else {
            alert("Username not found..")
        }
    }

    else {
        alert("Enter all the required..")
    }
}
login.addEventListener("click", () => {
    authenticate();
})


function createAcc() {
    localStorage.setItem(user.value, pass.value);
    console.log(localStorage);
    setTimeout(() => {
        createN.addEventListener("click", () => {
            login.classList.remove("invi")
            forget.classList.remove("invi")
            user.value = ""
            pass.value = ""
            alert("Account Created \nYou can now Login")
        });
    }, 2000);
}

createN.addEventListener("click", () => {
    login.classList.add("invi")
    forget.classList.add("invi")
    user.placeholder = " New Username"
    pass.placeholder = "Enter Password"
    createAcc();
})


