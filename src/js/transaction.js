function AcceptTransaction() {
    this.time = time;
    this.summ = summ;
    this.currency = currency;
    this.grow = grow;
    this.indexes = indexes;
    this.value = value;
    this.intervalTimer = intervalTimer;
    this.isTransactionActive = status;
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
    this.isTransactionActive = true;
    this.lockButtons();


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
        ShowTransaction.prototype.showInformation(currencyRise, btcRise);
    } else {
        var currencyDiff = this.value * this.indexes[this.currency] - this.value * newRatio;
        var btcDiff = currencyDiff/newRatio;
        UserData.prototype.updateCash(btcDiff);
        ShowTransaction.prototype.showInformation(currencyDiff, btcDiff);
    }
};

AcceptTransaction.prototype.findState = function (diff) {
    return diff >= 0 ? true : false;
};

AcceptTransaction.prototype.lockButtons = function () {
    var button = document.getElementById('confirm-button');
    var text = document.getElementById('summ');
    var selectForm = document.getElementById('currency');

    button.className = 'btn btn-outline-secondary disabled';
    text.setAttribute('disabled', 'disabled');
    selectForm.setAttribute('disabled', 'disabled');
};

AcceptTransaction.prototype.changeActiveState = function () {
    return this.isTransactionActive = false;
};

AcceptTransaction.prototype.getTransactionStatus = function () {
    return this.isTransactionActive;
};