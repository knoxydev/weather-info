let base = {
	idKeyOne 		: "4d71e2ca78b19770ec229c75b21db70c",
	idKeyTwo		: "a6ef7ec1f6c949ab82e7f582bac77c48",
	searchCity 	: "none",
	tempUnits 	: "metric",
	info				: 0,
	infoTwo			: 0,
	int 				: 0,
	unit 				: "C",
	colors			: ["crimson", "tomato", "goldenrod", "springgreen", "lightgreen", "palegreen", "mediumspringgreen", "mediumslateblue", "salmon", "turquoise"],

	async tempRecommend() {
		let moscow = `https://api.openweathermap.org/data/2.5/weather?q=Москва&units=${this.tempUnits}&appid=${this.idKeyOne}`;
		let newyork = `https://api.openweathermap.org/data/2.5/weather?q=Нью-Йорк&units=${this.tempUnits}&appid=${this.idKeyOne}`;
		let paris = `https://api.openweathermap.org/data/2.5/weather?q=Париж&units=${this.tempUnits}&appid=${this.idKeyOne}`;
		let tokyo = `https://api.openweathermap.org/data/2.5/weather?q=Токио&units=${this.tempUnits}&appid=${this.idKeyOne}`;
		let berlin = `https://api.openweathermap.org/data/2.5/weather?q=Берлин&units=${this.tempUnits}&appid=${this.idKeyOne}`;

		let answerOne = await fetch(moscow);
		let resp1 = await answerOne.json();
		let answerTwo = await fetch(newyork);
		let resp2 = await answerTwo.json();
		let answerThe = await fetch(paris);
		let resp3 = await answerThe.json();
		let answerFou = await fetch(tokyo);
		let resp4 = await answerFou.json();
		let answerFiv = await fetch(berlin);
		let resp5 = await answerFiv.json();

		document.querySelector("#temp-recommendation-item div:nth-of-type(1)").innerHTML = resp1.main.temp + ` &deg;${this.unit}`;
		document.querySelector("#temp-recommendation-item div:nth-of-type(2)").innerHTML = resp2.main.temp + ` &deg;${this.unit}`;
		document.querySelector("#temp-recommendation-item div:nth-of-type(3)").innerHTML = resp3.main.temp + ` &deg;${this.unit}`;
		document.querySelector("#temp-recommendation-item div:nth-of-type(4)").innerHTML = resp4.main.temp + ` &deg;${this.unit}`;
		document.querySelector("#temp-recommendation-item div:nth-of-type(5)").innerHTML = resp5.main.temp + ` &deg;${this.unit}`;
	},

	async mainRequest() {
		if (this.unit == "C") this.tempUnits = "metric";
		else this.tempUnits = "imperial";

		let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity}&units=${this.tempUnits}&appid=${this.idKeyOne}`;
		let response = await fetch(url);
		this.info = await response.json();

		document.getElementById('weather-icon').setAttribute('src', 'http://openweathermap.org/img/wn/' + this.info.weather[0].icon + '@2x.png');
		document.getElementById("temp-one-main").innerHTML = this.info.main.temp + ` &deg;${this.unit}`;
		document.getElementById('temp-feel').innerHTML = this.info.main.feels_like + ` &deg;${this.unit}`;
    document.getElementById('temp-humidity').innerHTML = this.info.main.humidity + "%";
    document.getElementById('temp-speed').innerHTML = this.info.wind.speed + " метр/сек";
    document.getElementById('temp-deg').innerHTML = this.info.wind.deg + " град";
    document.getElementById('temp-cloud').innerHTML = this.info.clouds.all + "%";
	},

	async getCountry() {
		let url = `https://api.opencagedata.com/geocode/v1/json?q=${this.searchCity}&key=${this.idKeyTwo}`;
		let response = await fetch(url);
		this.infoTwo = await response.json();

		document.getElementById("search-city-name").innerHTML = this.infoTwo.results[0].formatted;
	}
};

base.tempRecommend();

document.getElementById("header-search-button").addEventListener("click", (e) => {
	let searchTown = document.getElementById("header-search-input").value;
	base.searchCity = searchTown;
	base.mainRequest();
	base.getCountry();
});

document.getElementById("header-search-button-units").addEventListener("click", (e) => {
	if (base.int % 2 == 0) {
		document.getElementById("header-search-button-units").innerHTML = "&deg;F";
		base.unit = "F";
	}
	else {
		document.getElementById("header-search-button-units").innerHTML = "&deg;C";
		base.unit = "C";
	}
	base.int++;
});

document.getElementById("temp-recommendation-update-btn").addEventListener("click", (e) => base.tempRecommend());


