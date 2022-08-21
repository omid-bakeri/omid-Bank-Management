"use strict";

const account1 = {
    owner: "Ali Dashti",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1455855,
};

const account2 = {
    owner: "Mohammad Tayebi",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 52145,
};

const account3 = {
    owner: "Reza Tehrani",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 84745,
};

const account4 = {
    owner: "Sarah Ali Poor",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 145879586,
};

const accounts = [account1, account2, account3, account4];

const btnLogin = document.querySelector("#btn--login--bankist");
const errorBox = document.querySelector(".ErrorBox");
const guide = document.querySelector(".Guide");
const guideGuideBox = document.querySelector(".guide___guideBox");
const overlayGuideBox = document.querySelector(".overlay___guideBox");
const closeGuideBox = document.querySelector(".close___guideBox");
const accountOperationBox = document.querySelector(
    "#Account___operation---Box"
);
const AccountOperation = document.querySelector(".Account___operation");
const hiddenAccountOperation = document.querySelector(
    ".hiddenAccountOperation"
);
const loginUsername = document.querySelector(".login--username");
const loginPassword = document.querySelector(".login--password");
const textError = document.querySelector(".textError");
const hiddenLoginError = document.querySelector(".hidden");
const overlay = document.querySelector(".overlay");
const Timer = document.querySelector(".Timer");
const container___Movements = document.querySelector(".leftBox___box2");
const timeToleft___minutes___Exit = document.querySelector(
    ".time___Toleft---minutes"
);
const timeToleft___seconds___Exit = document.querySelector(
    ".time___Toleft---seconds"
);
const time___Toleft___time = document.querySelector(".time___Toleft---time");
const leftBox___box1___money = document.querySelector(
    ".leftBox___box1---moneyAmount"
);
const leftBox___box1___Title = document.querySelector(
    ".leftBox___box1---title"
);
const operation___transferMoney___amount = document.querySelector(
    ".operation___transferMoney---amount"
);
const operation___transferMoney___person = document.querySelector(
    ".operation___transferMoney---person"
);
const operation___transferMoney___button = document.querySelector(
    ".operation___transferMoney---button"
);
const operation___requestMoney___amount = document.querySelector(
    ".operation___requestMoney---amount"
);
const operation___requestMoney___button = document.querySelector(
    ".operation___requestMoney---button"
);
const operation___exitMoney___confirmUsername = document.querySelector(
    ".operation___exitMoney---usernameConfirm"
);
const operation___exitMoney___confirmPassword = document.querySelector(
    ".operation___exitMoney---passwordConfirm"
);
const operation___exitMoney___buttonExit = document.querySelector(
    ".operation___exitMoney---buttonConfirmExit"
);
const hiddenShape = document.querySelector(".hiddenShape");
const Shape = document.querySelector(".Shape");
const back___Button___hidden = document.querySelector(
    ".back___Button---hidden"
);
const back___Button = document.querySelector(".back___Button");
const login = document.querySelector(".login");
const hiddenLoginBox = document.querySelector(".hiddenLoginBox");

guide.addEventListener("click", () => {
    guideGuideBox.classList.remove(".hidden___guideBox");
    overlayGuideBox.classList.remove(".hidden___guideBox");
    guideGuideBox.style.display = "block";
    overlayGuideBox.style.display = "block";
});

closeGuideBox.addEventListener("click", () => {
    guideGuideBox.classList.add(".hidden___guideBox");
    overlayGuideBox.classList.add(".hidden___guideBox");
    guideGuideBox.style.display = "none";
    overlayGuideBox.style.display = "none";
});

const displayMovements = function(movements, sort = false) {
    container___Movements.innerHTML = "";

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function(mov, i) {
        const type = mov > 0 ? "سپرده" : "برداشت";

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__value">${mov} تومان</div>
      </div>
    `;

        container___Movements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    leftBox___box1___money.textContent = `${acc.balance}`;
};

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};
createUsernames(accounts);

const updateUI = function(acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function(e) {
    if (loginUsername.value.length == "") {
        hiddenLoginError.style.display = "block";
        textError.textContent = "نام کاربری یا گذرواژه وارد نشده است.";
        loginUsername.style.borderColor = "red";
    }
    if (loginPassword.value.length == "") {
        hiddenLoginError.style.display = "block";
        textError.textContent = "نام کاربری یا گذرواژه وارد نشده است.";
        loginPassword.style.borderColor = "red";
    }

    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find((acc) => acc.username === loginUsername.value);
    console.log(currentAccount);

    if (currentAccount && currentAccount.pin === Number(loginPassword.value)) {
        // Display UI and message
        leftBox___box1___Title.textContent = `خوش آمدید, ${
      currentAccount.owner.split(" ")[0]
    } عزیز`;
        hiddenAccountOperation.style.display = "block";
        Shape.style.opacity = 0;
        back___Button___hidden.style.display = "block";
        hiddenLoginBox.style.display = "none";

        // Clear input fields
        loginUsername.value = loginPassword.value = "";

        // Update UI
        updateUI(currentAccount);
    } else {
        hiddenLoginError.style.display = "block";
        textError.textContent = "نام کاربری یا گذرواژه اشتباه است.";
    }
});

loginUsername.addEventListener("click", () => {
    if (loginUsername.value.length == "") {
        hiddenLoginError.style.display = "none";
        loginUsername.style.borderColor = "#3CC6F2";
    }
});

loginPassword.addEventListener("click", () => {
    if (loginPassword.value.length == "") {
        hiddenLoginError.style.display = "none";
        loginPassword.style.borderColor = "#3CC6F2";
    }
});

operation___transferMoney___button.addEventListener("click", function(e) {
    e.preventDefault();
    const amount = Number(operation___transferMoney___amount.value);
    const receiverAcc = accounts.find(
        (acc) => acc.username === operation___transferMoney___person.value
    );
    operation___transferMoney___amount.value =
        operation___transferMoney___person.value = "";

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc &&
        receiverAcc.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
});

/*Request*/

operation___requestMoney___button.addEventListener("click", function(e) {
    e.preventDefault();

    const amount = Number(operation___requestMoney___amount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        // Add movement
        currentAccount.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
    operation___requestMoney___amount.value = "";
});

operation___exitMoney___buttonExit.addEventListener("click", function(e) {
    e.preventDefault();

    if (
        operation___exitMoney___confirmUsername.value === currentAccount.username &&
        Number(operation___exitMoney___confirmPassword.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );
        console.log(index);
        // .indexOf(23)

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        AccountOperation.style.opacity = 0;
    }

    operation___exitMoney___confirmUsername.value =
        operation___exitMoney___confirmPassword.value = "";
});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

function getCurrentTime(time) {
    let currentTime = new Date();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var second = currentTime.getSeconds();

    if (hour.toString().length == 1) {
        hour = "0" + hour;
    }
    if (minute.toString().length == 1) {
        minute = "0" + minute;
    }
    if (second.toString().length == 1) {
        second = "0" + second;
    }

    time = hour + ":" + minute + ":" + second;
    return time;
}
setInterval(function() {
    var cTime = getCurrentTime();
    Timer.innerHTML = cTime;
}, 1000);

var countDown = new Date().getTime() + 5 * 60 * 1000;

// function showClock(target) {
//     let distance = target - new Date().getTime();
//     var mins =
//         distance < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var secs = distance < 0 ? 0 : Math.floor((distance % (1000 * 60)) / 1000);

//     if (mins.toString().length == 1) {
//         mins = "0" + mins;
//     }
//     if (secs.toString().length == 1) {
//         secs = "0" + secs;
//     }

//     time___Toleft___time.innerHTML = mins + ":" + secs;
// }

// showClock(countDown);

// // Update the count down every 1 second
// var x = setInterval(function() {
//     showClock(countDown);
//     if (countDown - new Date().getTime() < 0) {
//         clearInterval(x);
//     }
// }, 1000);

back___Button.addEventListener("click", () => {
    Shape.style.opacity = 100;
    hiddenLoginBox.style.display = "block";
    back___Button___hidden.style.display = "none";
    hiddenAccountOperation.style.display = "none";
});