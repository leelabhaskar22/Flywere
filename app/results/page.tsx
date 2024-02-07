  'use client'
  import React ,{useEffect, useState} from 'react'
  import Navbar from '@/components/Navbar'
  import Search from '@/components/Search'
  import Flight from '@/components/Flight'
  import {ApiDataTypes} from '@/app/lib/definitions'
  import { handleSearch } from '../lib/data'
  import { useSearchParams } from 'next/navigation'

  export default  function Results()
   {
    const [flights ,setFlights] = useState()
    const formattedDate = (dateString : string) => {
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const date  = new Date(dateString);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    const formattedDateString = date.toLocaleDateString('en-US', optionsDate);
    
    return {
      time: formattedTime,
      date: formattedDateString,
      original : dateString
    };
  };
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const data : ApiDataTypes = {
    sourceAirportIata: searchParams.get('sourceAirportIata')?.toString(),
    destinationAirportIata: searchParams.get('destinationAirportIata')?.toString(),
    departureDate:  searchParams.get('departureDate')?.toString(),
    tripType:  searchParams.get('tripType')?.toString(),
    selectedPassengers:  searchParams.get('selectedPassengers')?.toString(),
    selectedClass:  searchParams.get('selectedClass')?.toString(),
    selectedChildren:  searchParams.get('selectedChildren')?.toString(),
  }  
  const FetchFlights =  async () => {
  const flightsdata = await handleSearch(data);
  setFlights(flightsdata)
  } 
  FetchFlights()
  },[])

  return ( 
    <div className='relative  bg-blue-500 h-72 w-screen'>
      <Navbar />
      <div className='absolute'>
        <Search  />
          <div className='flex w-4/5 mx-auto  flex-col'>
            {flights?.map((flight, index: number) => (
              <Flight
                key={index}
                url={flight?.segments[0].legs[0].operatingCarrier.logoUrl}
                departtime={formattedDate(flight.segments[0].legs[0].departureDateTime)}
                arrivaltime={formattedDate( 
                  flight.segments[0].legs[0].arrivalDateTime
                )}
                stops={flight.segments.reduce(
                  (totalStops: any, segment: { layovers: string | any[] }) =>
                    totalStops + segment.layovers.length,
                  0
                )} 
                flightnumber={flight.segments[0].legs[0].operatingCarrierCode + flight.segments[0].legs[0].flightNumber}
                duration={flight.segments[0].layovers[0]?.durationInMinutes}
                price={flight.purchaseLinks[0].totalPrice}
                link={flight.purchaseLinks[0].url}
                tag = {flight.itineraryTag?.tag}
              />
              ))}
          </div>
        </div>
  </div>
    )
  }
