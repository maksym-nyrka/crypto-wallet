class ListenerSetter {

    constructor(app) {
        this.app = app;
    }

    setEventListeners() {
        this.setSendListener();
        this.setChangeCurrencyListener();
        this.setActiveCurrencyListener();
        this.setMnemonicListeners();
        this.setSignInButtonListener();
        this.setLoginButtonListener();
        this.setCloseModalButtonListener();
    }

    setSendListener() {
        const sendButton = document.getElementById("send_button");
        sendButton.addEventListener("click", () => {
            const to = document.getElementById("receiver_input").value;
            const amount = document.getElementById("amount_input").value;

            this.app.sendCurrency(to, amount).then(result => {
                alert(result);
            });
        })
    }

    setChangeCurrencyListener() {
        const currencyLinks = document.getElementsByClassName("currency-select");

        for (const currencyLink of currencyLinks) {
            currencyLink.addEventListener("click", evt => {
                const targetElement = evt.target;
                const currency = targetElement.getAttribute("data-value");
                this.app.changeCurrency(currency);
            })
        }
    }

    setActiveCurrencyListener() {
        const currencyLinks = document.querySelectorAll('.currency-select');

        currencyLinks.forEach(link => {
                link.addEventListener('click', this.toggleCurrencyActive)
        });
    }

    toggleCurrencyActive() {
        let active = document.getElementsByClassName('active')[0];
        if (active !== undefined) {
            active.classList.toggle('active');
        }

        this.classList.toggle('active');
    }

    setMnemonicListeners(){
        this.setGenerateMnemonicListener();
        this.setImportMnemonicOnInputListener();
    }

    setGenerateMnemonicListener(){
        document.getElementById("generate_mnemonic").addEventListener("click",async()=>{
            let mnemonic = await this.app.generateMnemonic();
            const mnemonicInput = document.getElementById("import_mnemonic");
            mnemonicInput.value = mnemonic;
            console.log(mnemonic);
            this.app.importMnemonic(mnemonic);
        })
    }

    setImportMnemonicOnInputListener(){
        document.getElementById("import_mnemonic").addEventListener("input",async()=>{
            let element = event.target || event.srcElement;
            let mnemonic = element.value;
            console.log(mnemonic);
            this.app.importMnemonic(mnemonic);
        })
    }

    setSignInButtonListener() {
        document.getElementById("sign_in_button").addEventListener("click", async () => {
            document.getElementById("welcome").style.display = "none";
            document.getElementById("main").style.display = "block";
            this.app.prepareInterface();
        })
    }

    setLoginButtonListener() {
        document.getElementById("login_button").addEventListener("click", async () => {
            document.getElementById("welcome").style.display = "none";
        })
    }

    setCloseModalButtonListener() {
        document.getElementById("close_modal").addEventListener("click", async () => {
            document.getElementById("welcome").style.display = "block";
        })
    }
}

module.exports = ListenerSetter;
