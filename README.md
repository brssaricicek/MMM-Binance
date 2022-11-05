# MMM-Binance
This is a module for the MagicMirror² smart mirror project.<br>
This module displays cryptocurrency information from the [Binance](https://www.binance.com/) website. This module uses Websocket Market Streams. See more https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams

## Installation

To install the module, use your terminal to:

1. Navigate to your MagicMirror's modules folder. If you are using the default installation directory, use the command:
 <br />`cd ~/MagicMirror/modules`
2. Copy the module to your computer by executing the following command:
 <br />`git clone https://github.com/brssaricicek/MMM-Binance.git`
3. Enter the 'MMM-Binance' directory and Install the node modules:
 <br />`cd MMM-Binance && npm install`
 
 ### MagicMirror² Configuration

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
    modules: [
        ...
        {
            module: 'MMM-Binance',
            position: "top_rigt",
            header: "Binance Cryptocurrencies",
            config: {
                currencies: ['btcusdt','ethusdt'],
                decimalPlaces: 2,        
            }
        },
        ...
    ]
}
```

### Configuration Options

| Option                  |                                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------|
| `currencies`            |**Default:** `['btcusdt', 'ethusdt']`<br /> **Type:** Array                                                               |
| `decimalPlaces`         |Optional - How many digits to display in the price after the decimal. <br> **Default:** `2`<br />  **Type:** Integer <br> |
| `fontSize`               |Optional -Changes the font size. <br  />  **Type:** String <br>  **Property Values:**  xx-small, x-small, small, medium, large, x-large, xx-large, <br>  smaller : Decreases the font-size by one relative unit. <br> larger: Increases the font-size by one relative unit. <br> length: Defines the font-size in length units. <br> % : Sets the font-size to a % of the parent element's font size  |