async function loadCurrencies() {
    const response = await fetch(
        "https://api.frankfurter.dev/v2/currencies"
    );

    const currencies = await response.json();

    currencies.forEach(currency => {
        let optionCurrencyFrom = document.createElement("option");
        optionCurrencyFrom.value = currency.iso_code;
        optionCurrencyFrom.textContent = 
            currency.iso_code + " - " + currency.name;

        let optionCurrencyTo = optionCurrencyFrom.cloneNode(true);

        currencyFromSelect.appendChild(optionCurrencyFrom);
        currencyToSelect.appendChild(optionCurrencyTo);
    });
}

function fetchCurrencies() {
    const currencyNameFrom = currencyFromSelect.value;
    const currencyNameTo = currencyToSelect.value;

    const amount = parseFloat(document.getElementById("AmountOfMoney").value);

    if (isNaN(amount)) {
        showPopup("Amount cannot be empty", "Error");
        return;
    }

    if (currencyNameFrom === currencyNameTo) {
        showPopup("Currencies cannot be same", "Error");
        return;
    }

    fetch(`https://api.frankfurter.dev/v2/rate/${currencyNameFrom}/${currencyNameTo}`)
    .then(res => res.json())
    .then(data => {      
        document.getElementById("result").style.display = "block";
        document.getElementById("resultEnter").value =
                `${amount} ${currencyNameFrom}`
        document.getElementById("resultExit").value =
                 `${(data["rate"]*amount).toFixed()} ${currencyNameTo}`;
    });
    
}

function showPopup(message, type = "success", duration = 3000) {
    const popup = document.querySelector("#PopupNotification");

    popup.textContent = message;
    popup.className = `popup ${type} show`;

    clearTimeout(popupTimer);

    popupTimer = setTimeout(() => {
        popup.classList.remove("show");
    }, duration);
}

const currencyFromSelect = document.getElementById("SelectCurrencyNameFrom");
const currencyToSelect = document.getElementById("SelectCurrencyNameTo");
const convertButton = document.getElementById("convBtn");

convertButton.addEventListener("click", fetchCurrencies);

let popupTimer;

loadCurrencies();
