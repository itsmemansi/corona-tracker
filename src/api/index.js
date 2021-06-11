import axios from "axios";
const url = "https://covid19.mathdro.id/api"; // url of api
const urlDailyDate = "https://covid19.mathdro.id/api/daily";
const urlCountries = "https://covid19.mathdro.id/api/countries"; 

export const fetchData = async(country) => {
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data : {confirmed, recovered, deaths,lastUpdate}} = await axios.get(changeableUrl);
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate
        // }
        // return modifiedData;
        return {confirmed, recovered, deaths, lastUpdate};
    } 
    catch (error) {
        console.log(error);
    }
}
export const fetchDailyData = async() => {
    try {
        const {data} = await axios.get(urlDailyDate); 
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        console.log(modifiedData);
        return modifiedData;

    } 
    catch (error) {
        console.log(error);
    }
}
export const fetchCountries = async() => {
    try {
        const { data:{countries} } = await axios.get(urlCountries);
        // console.log(response);
        return countries.map((country) => country.name);
    } 
    catch (error) {
        console.log(error);
    }
}
