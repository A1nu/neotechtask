function ShowTransaction() {
    this.data = data;
}

ShowTransaction.prototype.showInformation = function (currency, btc) {
    var icon = document.getElementById('icon-holder');
    var congratulationText = document.getElementById('message1');
    var summText = document.getElementById('message2');
    var currencyCount = document.getElementById('message3');
    var currencyName = Indexes.prototype.getCurrencyRow(AcceptTransaction.prototype.currency);

    if (this.findState(btc)) {
        icon.innerHTML = this.IMG_LINKS['win'];
        congratulationText.innerHTML = this.BET_TEXT['congratulation'];
        summText.innerHTML = this.BET_TEXT['win'];
        currencyCount.innerHTML = btc + "BTC / " + currency + " " + currencyName;
        this.showWindow();
    } else {
        icon.innerHTML = this.IMG_LINKS['lose'];
        congratulationText.innerHTML = this.BET_TEXT['consolation'];
        summText.innerHTML = this.BET_TEXT['lose'];
        currencyCount.innerHTML = Math.abs(parseInt(btc)) + "BTC / " + Math.abs(parseInt(currency)) + " " + currencyName;
        this.showWindow();
    }
};

ShowTransaction.prototype.findState = function (diff) {
    return diff >= 0 ? true : false;
};

ShowTransaction.prototype.showWindow = function () {
    var main = document.getElementById('main-page');
    var popup = document.getElementById('modal');
    popup.style = "display: block";
    main.style = "display: none";
};

ShowTransaction.prototype.returnState = function () {
    var main = document.getElementById('main-page');
    var popup = document.getElementById('modal');
    main.style = "display: block";
    popup.style = "display: none";
    this.unlockButtons();
};

ShowTransaction.prototype.unlockButtons = function () {
    var button = document.getElementById('confirm-button');
    var text = document.getElementById('summ');
    var selectForm = document.getElementById('currency');

    button.className = 'btn btn-outline-secondary active';
    text.removeAttribute('disabled');
    selectForm.removeAttribute('disabled');
    AcceptTransaction.prototype.changeActiveState();
};

ShowTransaction.prototype.IMG_LINKS = {
    win : "<img src=\"images/accept.png\">",
    lose : "<img src=\"images/decline.png\">"
};

ShowTransaction.prototype.BET_TEXT = {
    congratulation: "Поздравляем, ваша ставка выиграла.",
    win: "Сумма выигрыша по обновленному курсу:",
    consolation: "К сожалению, ваша ставка проиграла.",
    lose: "Сумма которая будет списана со счета:"
};