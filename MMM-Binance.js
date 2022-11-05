

Module.register("MMM-Binance", {
    defaults: {
      currencies: ['btcusdt','ethusdt'],
      decimalPlaces: 2, 
    },

    getStyles: function() {
      return [
        this.file('style.css'), 
      ]
    },

    start: function(){
      this.element = document.createElement("div") 
      this.sCurrencies = ""
    },
    
    createTable: function(){
      var sCurrencies=''
      var currenciesLength = this.config.currencies.length
      var tbl = document.createElement('table')
      var tbdy = document.createElement('tbody')
      for(i=0;i<currenciesLength;i++){
        sCurrencies = sCurrencies + this.config.currencies[i].toLowerCase()
        if (i==currenciesLength-1)
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
        divP.id = this.config.currencies[i].toLowerCase()+"P"
        divP.innerHTML = "Loading..."
        td.appendChild(divP)
        tr.appendChild(td)
        var td = document.createElement('td')
        var divPer = document.createElement('div')
        divPer.id = this.config.currencies[i].toLowerCase()+"Per"
        divPer.innerHTML = "0 %"
        td.appendChild(divPer)
        tr.appendChild(td)
        tbdy.appendChild(tr)
      }
      this.sCurrencies = sCurrencies
      tbl.appendChild(tbdy)
      this.element.appendChild(tbl)
    },

    getDom: function() {
      this.createTable()
      var burl = 'wss://stream.binance.com:9443/ws/'
      var url = burl+this.sCurrencies
      let ws = new WebSocket(url);
      ws.onmessage = (event)=>{
        let stockObject = JSON.parse(event.data);
        let stockPriceElement = document.getElementById(stockObject.s.toLowerCase()+"P");
        stockPriceElement.innerHTML = parseFloat(stockObject.c).toFixed(this.config.decimalPlaces) 
        let stockPricePerElement = document.getElementById(stockObject.s.toLowerCase()+"Per");
        stockPricePerElement.innerHTML = parseFloat(stockObject.p).toFixed(this.config.decimalPlaces) +" (" + parseFloat(stockObject.P).toFixed(this.config.decimalPlaces) + " %)"
        if(stockObject.P<0)
          stockPricePerElement.style.color ="red"
        if(stockObject.P>0)
          stockPricePerElement.style.color ="green"
      }
      return this.element
    },
  });