

Module.register("MMM-Binance", {
  defaults: {
    currencies: ['btcusdt', 'ethusdt'],
    futuresCurrencies: ['bnbusdt'],
    decimalPlaces: 2,
    fontSize: ""
  },

  getStyles: function () {
    return [
      this.file('style.css'),
    ]
  },

  start: function () {
    this.element = document.createElement("div")
    this.sCurrencies = ""
    this.sFuturesCurrencies = ""
  },

  createTable: function () {
    var sCurrencies = ''
    var currenciesLength = this.config.currencies.length
    var tbl = document.createElement('table')
    var tbdy = document.createElement('tbody')
    for (i = 0; i < currenciesLength; i++) {
      sCurrencies = sCurrencies + this.config.currencies[i].toLowerCase()
      if (i == currenciesLength - 1)
        sCurrencies += '@ticker'
      else
        sCurrencies += '@ticker/'
      var tr = document.createElement('tr')
      var td = document.createElement('td')
      var div = document.createElement('div')
      div.id = this.config.currencies[i]
      div.innerHTML = this.config.currencies[i].toUpperCase()
      td.appendChild(div)
      tr.appendChild(td)
      var td = document.createElement('td')
      var divP = document.createElement('div')
      divP.id = this.config.currencies[i].toLowerCase() + "P"
      divP.innerHTML = "Loading..."
      td.appendChild(divP)
      tr.appendChild(td)
      var td = document.createElement('td')
      var divPer = document.createElement('div')
      divPer.id = this.config.currencies[i].toLowerCase() + "Per"
      divPer.setAttribute("class", "divPer")
      divPer.innerHTML = "0 %"
      td.appendChild(divPer)
      tr.appendChild(td)
      tbdy.appendChild(tr)
    }
    this.sCurrencies = sCurrencies
    tbl.appendChild(tbdy)
    this.element.appendChild(tbl)

    var sFuturesCurrencies = ''
    var futuresCurrenciesLength = this.config.futuresCurrencies.length
    var tbl = document.createElement('table')
    var tbdy = document.createElement('tbody')
    for (i = 0; i < futuresCurrenciesLength; i++) {
      sFuturesCurrencies = sFuturesCurrencies + this.config.futuresCurrencies[i].toLowerCase()
      if (i == futuresCurrenciesLength - 1)
        sFuturesCurrencies += '@ticker'
      else
        sFuturesCurrencies += '@ticker/'
      var tr = document.createElement('tr')
      var td = document.createElement('td')
      var div = document.createElement('div')
      div.id = this.config.futuresCurrencies[i]
      div.innerHTML = this.config.futuresCurrencies[i].toUpperCase()
      td.appendChild(div)
      tr.appendChild(td)
      var td = document.createElement('td')
      var divP = document.createElement('div')
      divP.id = this.config.futuresCurrencies[i].toLowerCase() + "P"
      divP.innerHTML = "Loading..."
      td.appendChild(divP)
      tr.appendChild(td)
      var td = document.createElement('td')
      var divPer = document.createElement('div')
      divPer.id = this.config.futuresCurrencies[i].toLowerCase() + "Per"
      divPer.setAttribute("class", "divPer")
      divPer.innerHTML = "0 %"
      td.appendChild(divPer)
      tr.appendChild(td)
      tbdy.appendChild(tr)
    }
    this.sFuturesCurrencies = sFuturesCurrencies
    tbl.appendChild(tbdy)
    this.element.appendChild(tbl)
  },

  onMessage: function (message) {
    let stockObject = JSON.parse(message.data);
    console.log(stockObject)
    let stockPriceElement = document.getElementById(stockObject.s.toLowerCase() + "P");
    if (stockObject.c) {
      stockPriceElement.innerHTML = parseFloat(stockObject.c).toFixed(this.config.decimalPlaces)
    }
    let stockPricePerElement = document.getElementById(stockObject.s.toLowerCase() + "Per");
    if (stockObject.p) {
      stockPricePerElement.innerHTML = parseFloat(stockObject.p).toFixed(this.config.decimalPlaces) + " (" + parseFloat(stockObject.P).toFixed(this.config.decimalPlaces) + " %)"
    }
    if (stockObject.P < 0)
      stockPricePerElement.style.color = "red"
    if (stockObject.P > 0)
      stockPricePerElement.style.color = "green"
  },

  futuresWS: function () {
    var burl = 'wss://fstream.binance.com/ws/'
    var url = burl + this.sFuturesCurrencies
    let ws = new WebSocket(url);
    ws.onmessage = (event) => this.onMessage(event)
  },
  spotWS: function () {
    var burl = 'wss://stream.binance.com:9443/ws/'
    var url = burl + this.sCurrencies
    let ws = new WebSocket(url);
    ws.onmessage = (event) => this.onMessage(event)
  },

  getDom: function () {
    this.createTable()
    if (this.config.fontSize != "")
      this.element.style.fontSize = this.config.fontSize

    this.spotWS()
    this.futuresWS()
    return this.element
  },
});

