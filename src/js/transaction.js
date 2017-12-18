function AcceptTransaction() {
    this.time = time;
    this.summ = summ;
    this.currency = currency;
    this.grow = grow;
    this.indexes = indexes;
    this.value = value;
    this.intervalTimer;
}

AcceptTransaction.prototype.onConfirmButtonClicked = function () {
    this.value = this.getValue();

    if (this.value == '') {
        window.alert('Поле суммы пустое.');
        return;
    }

    if (this.value > UserData.prototype.cash()) {
        window.alert('Сумма на вашем балансе не достаточна для выполнения ставки.');
        return;
    }

    if (!this.isNumber(this.value)) {
        window.alert('В поле суммы необходимо вводить численное значение.');
        return;
    }

    if (!this.checkCurrencyChange()) {
        window.alert('Необходимо указать в какую сторону изменятся котировки.');
        return;
    }

    if (!($('#accept').prop('checked'))) {
        window.alert('Для продолжения необходимо принять правила сервиса.');
        return;
    }
    this.time = Indexes.prototype.getTime();
    this.indexes = Indexes.prototype.getCurrencyState();
    this.currency = this.getCurrency();
    this.setSumm();
    console.log(this.summ);
    console.log('currency', this.currency);
    console.log('trans: ', this.time, this.indexes);
    console.log('Start');
    this.intervalTimer = 5000;
    this.intervalTimer = setInterval(function () {
        AcceptTransaction.prototype.awaitIndexChanging()
    }, this.intervalTimer);
};

AcceptTransaction.prototype.isNumber = function (value) {
    return !isNaN(value) ? true : false;
};

AcceptTransaction.prototype.checkCurrencyChange = function () {
    var up = $('#up').prop('checked');
    var down = $('#down').prop('checked');

    if (up || down) {
        if (up) {
            this.grow = true;
            return [true, this.grow];
        } else {
            this.grow = false;
            return [true, this.grow];
        }
    } else {
        return false;
    }
};

AcceptTransaction.prototype.getCurrency = function () {
    return document.getElementById('currency').value;

};

AcceptTransaction.prototype.getValue = function () {
    return document.getElementById('summ').value;
};

AcceptTransaction.prototype.awaitIndexChanging = function () {
    console.log('refresh State');
    if (Indexes.prototype.getTime() !== this.time) {
        clearInterval(this.intervalTimer);
        this.intervalTimer = 0;
        this.transactionComplete();
    }
};

AcceptTransaction.prototype.setSumm = function () {
    var ratio = this.indexes[this.currency];
    var value = parseInt(this.value);

    return this.summ = (value * ratio);
};

AcceptTransaction.prototype.transactionComplete = function () {
    var NewIndexes = Indexes.prototype.getCurrencyState();
    var newRatio = NewIndexes[this.currency];
    console.log('completed');
    if (this.grow) {
        var currencyRise = this.value * newRatio - this.value * this.indexes[this.currency];
        var btcRise = currencyRise/newRatio;
        UserData.prototype.updateCash(btcRise);
        this.showInformation(currencyRise, btcRise);
    } else {
        var currencyDiff = this.value * this.indexes[this.currency] - this.value * newRatio;
        var btcDiff = currencyDiff/newRatio;
        UserData.prototype.updateCash(btcDiff);
    }
};

AcceptTransaction.prototype.showInformation = function (currency, btc) {
    var icon = document.getElementById('icon-holder');
    var congratulationText = document.getElementById('message1');
    var summText = document.getElementById('message2');
    var currencyCount = document.getElementById('message3');
    var currencyName = Indexes.prototype.getCurrencyRow(this.currency);

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

AcceptTransaction.prototype.findState = function (diff) {
    return diff >= 0 ? true : false;
};

AcceptTransaction.prototype.showWindow = function () {
    var main = document.getElementById('main-page');
    var popup = document.getElementById('modal');
    popup.style = "display: block";
    main.style = "display: none";
};

AcceptTransaction.prototype.returnState = function () {
  var main = document.getElementById('main-page');
  var popup = document.getElementById('modal');
  main.style = "display: block";
  popup.style = "display: none";
};

AcceptTransaction.prototype.IMG_LINKS = {
  win : "<img src=\"images/accept.png\">",
  lose : "<img src=\"images/decline.png\">"
};

AcceptTransaction.prototype.BET_TEXT = {
    congratulation: "Поздравляем, ваша ставка выиграла.",
    win: "Сумма выигрыша по обновленному курсу:",
    consolation: "К сожалению, ваша ставка проиграла.",
    lose: "Сумма которая будет списана со счета:"
};