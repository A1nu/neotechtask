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
    this.intervalTimer = setInterval(function () {
        AcceptTransaction.prototype.awaitIndexChanging()
    }, 5000);
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


    if (this.grow) {
        var currencyDiff = this.value * newRatio - this.value * this.indexes[this.currency];
        var btcDiff = currencyDiff/newRatio;
        UserData.prototype.updateCash(btcDiff);
        if (this.indexes[this.currency] < newRatio) {
            window.alert('Ставка победила, выигрыш составил'+ btcDiff + 'BTC' + currencyDiff + 'Валюты');
        } else {
            window.alert('Ставка проиграла, проигрыш составил'+ Math.abs(btcDiff) + 'BTC' + Math.abs(currencyDiff) + 'Валюты');
        }
    } else {
        var currencyDiff = this.value * this.indexes[this.currency] - this.value * newRatio;
        var btcDiff = currencyDiff/newRatio;
        if (this.indexes[this.currency] > newRatio) {
            window.alert('Ставка победила, выигрыш составил'+ btcDiff + 'BTC' + currencyDiff + 'Валюты');
        } else {
            window.alert('Ставка проиграла, проигрыш составил'+ Math.abs(btcDiff) + 'BTC' + Math.abs(currencyDiff) + 'Валюты');
        }
    }
};