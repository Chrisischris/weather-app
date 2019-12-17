# Weather App Code Challenge

Many applications function as a way to view and interact with a data source. A great source of ever-changing data that is easily understood is meteorological data. In this code challenge, we're asking Applicants to create an app that receives data from a free Weather API and display that data in a responsive, performant, and modern way.

In addition to displaying some of the returned data, the application will also allow for some limited interactivity as well as require some logic to be implemented for the complete solution.

## Dark Sky API

For most of the needed data, we recommend using the [Dark Sky API](https://darksky.net/dev), which is free for up to 1000 calls per day. This single resource has all of the weather data required for the complete solution. NB: The Dark Sky api has CORS disabled, so a front-end application will not be able to make calls directly. Applicants will need to either work directly with the "team lead" (i.e. the interview team or person who assigned the challenge) or figure it out on their own. There is an extremely simple solution and a variety of DIY solutions involving proxy servers.

## Basic User Requirements

For this application you will be targeting a desktop (1920x1080) and tablet (1024x768) viewport. Design mockups are available in the resources zip file in this repository.

Upon entering the application, the user's location should be queried and fed into the Dark Sky API to retrieve the weather forecast that it provides. This data will provide the foundation for everything else in the base requirements.

- Current weather conditions including: temperature, precipitation, high and low temperature for the day
- Hourly weather conditions including: temperature, precipitation or conditions (cloudy, sunny, etc.)
- Daily forecast for the week. Include for each day: high and low temperature, precipitation or conditions

User should be able to view three activities that depend heavily on weather.

- Kite Flying - minimum wind speed
- Jogging - max temperature, precipitation chance
- Skiing - recent snow?

User should be able to view weather data for five other locations.

1. New York City
2. Paris
3. Cairo
4. Hong Kong
5. Buenos Aires

## Advanced User Requirements

Users should be able to search for addresses from a Search Bar. Acceptable input is a full address or zip code. Incoming weather data will replace existing data on screen.

Users can switch between Celsius and Fahrenheit, and other metric/imperial measurements.

## Submission

Applicants will be given a temporary private repo in EagleDream's Gitlab account. They will commit all code to this repo and inform the dev team when the submission is complete.

Optionally, the live application may be hosted somewhere and submitted along with the code. In all circumstances, the repo should include instructions for running the application and include all tools necessary to carry these instructions out.

## Resources

The creative resources are attached as a zip file.

## Style guide

### LOGO

The Eagledream Technologies logo should be used in the header of the page.

### COLOR PALETTE

The following colors should be used throughout the page.

- Black (#000000): Used as the background color of the header, center circle, and footer. All of them have an opacity of 45%.
- Gray (#BB3B3): Used as the unselected text color. Metric or Imperial / C or F.
- White (#FFFFFF): Used as the main text color.

### TYPOGRAPHY

The Open Sans family of fonts should be used across the page.

Header: Open Sans Light, 28px, #ffffff

My Location (Left side of the page)

- title, current city: Open Sans Semibold, 20px, #ffffff
- list of city: Open Sans Light, 20px, #ffffff

Activities (Right side of the page)

- title: Open Sans Semibold, 20px, #ffffff
- info: Open Sans Light, 20px, #fffff

Current Weather Information (Center of the page inside the circle)

- selected city(NYC) : Open Sans Semibold, 42px, #ffffff
- current temperature(16): Open Sans Semibold, 176px, #ffffff
- low and high: Open Sans Light, 28px, #ffffff
- weather info(Windy): Open Sans Light, 36px, #ffffff

Footer

- Temperatures: Open Sans Light, 46px, #ffffff
- Time: Open Sans Light, 28px, #ffffff
- Selected mode: Open Sans Semibold, 28px, #ffffff
- Unselected mode: Open Sans light, 28px, #b3b3b3

### RULELINE

#ffffff 1pt solid
