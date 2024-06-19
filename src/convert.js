const celsiusFahrenheit = valor => ((valor * 9) / 5) + 32;

const fahrenheitCelsius = valor => ((valor - 32) * 5) / 9;

export { celsiusFahrenheit, fahrenheitCelsius };