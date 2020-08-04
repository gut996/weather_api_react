import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Media from "react-media";

const API_KEY = process.env.REACT_APP_API_KEY;
// console.log(process.env.REACT_APP_API_KEY);

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    // const api_call2 = await fetch(
    //   `    https://www.amdoren.com/api/timezone.php?api_key=${API_KEY2}&loc=New+York
    //   `
    // );

    const data = await api_call.json();
    // const data2 = await api_call2.json();

    // console.log(data);
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        feels_like: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values!",
      });
    }
  };
  render() {
    return (
      <div>
        <Media
          queries={{
            verySmall: "(max-width: 425px)",
            small: "(max-width: 1199px)",
            notSmall: "(min-width: 1200px)",
          }}
        >
          {(matches) => (
            <>
       
              {matches.small && (
                <div className="wrapper2">
                  <div className="main">
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-3 title-container">
                          <Titles />
                        </div>
                        <div className="col-xs-4 form-container2">
                          <Form getWeather={this.getWeather} />
                          <Weather
                            temperature={this.state.temperature}
                            feels_like={this.state.feels_like}
                            humidity={this.state.humidity}
                            city={this.state.city}
                            country={this.state.country}
                            description={this.state.description}
                            error={this.state.error}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {matches.notSmall && (
                <div className="wrapper">
                  <div className="main">
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-5 title-container">
                          <Titles />
                        </div>
                        <div className="col-xs-7 form-container">
                          <Form getWeather={this.getWeather} />
                          <Weather
                            temperature={this.state.temperature}
                            feels_like={this.state.feels_like}
                            humidity={this.state.humidity}
                            city={this.state.city}
                            country={this.state.country}
                            description={this.state.description}
                            error={this.state.error}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </Media>
      </div>
    );
  }
}

export default App;
