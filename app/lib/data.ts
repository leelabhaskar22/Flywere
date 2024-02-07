import {ApiDataTypes} from './definitions'
import axios from 'axios'

export const handleSearch = async (props : ApiDataTypes) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: props.sourceAirportIata,
        destinationAirportCode: props.destinationAirportIata,
        date: '2024-02-01',
        itineraryType: props.tripType, 
        sortOrder: 'ML_BEST_VALUE', 
        numAdults: props.selectedPassengers,
        numSeniors: '0',
        classOfService: props.selectedClass,
        pageNumber: '1',
        'childAges[0]': props.selectedChildren,
        currencyCode: 'INR',
      },
      headers: {
        'X-RapidAPI-Key': '[your_api_key]',//use your api you can get it from the  tripadvisor
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
      }
    });
    return response.data.data.flights
  } catch (error) {
    console.error(error);
  }
};

