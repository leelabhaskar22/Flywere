'use client'
import React, { useState, ChangeEvent , useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx'


const Search = () => {
  const searchParams = useSearchParams();
  const [sourceAirportIata, setSourceAirportIata] = useState<string>('');
  const [destinationAirportIata, setDestinationAirportIata] = useState<string>('');
  const [departDate, setDepartDate] = useState<Date>(new Date());
  const [selectedPassengers, setSelectedPassengers] = useState<number>(1);
  const [selectedChildren, setSelectedChildren] = useState<number>(0);
  const [selectedClass, setSelectedClass] = useState<string>('ECONOMY');
  const [tripType, setTripType] = useState<'ONE_WAY' | 'ROUND_TRIP'>('ONE_WAY');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const [returnDate, setReturnDate] = useState<Date>(tomorrow);
  const [container, setContainer] = useState<boolean>(false);
  const router = useRouter();

  function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
  }
  const departuredate = formatDateToYYYYMMDD(departDate)

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (sourceAirportIata) params.set('sourceAirportIata', sourceAirportIata.toUpperCase());
    if (destinationAirportIata) params.set('destinationAirportIata', destinationAirportIata.toUpperCase());
    if (departDate) params.set('departDate', departuredate.toString());
    if (selectedPassengers) params.set('selectedPassengers', selectedPassengers.toString());
    if (selectedChildren) params.set('selectedChildren', selectedChildren.toString());
    if (selectedClass) params.set('selectedClass', selectedClass);
    if (tripType) params.set('tripType', tripType);
    const newUrl = `/results?${params.toString()}`;
    router.push(newUrl);
  };


  return (
    <div className='flex flex-col p-3 bg-white   mt-20 rounded-xl mx-9'>
      <div className='flex justify-between '>
        <div className='flex items-center'>
          <input
            type='radio'
            className='m-1 cursor-pointer'
            checked={tripType === 'ONE_WAY'}
            onChange={() => setTripType('ONE_WAY')}
            defaultValue={searchParams.get('tripType')?.toString()}
            id='oneWay'
          />
            <label htmlFor='oneWay'>One-way</label>
          <input
            type='radio'
            className='m-1 cursor-pointer'
            checked={tripType === 'ROUND_TRIP'}
            onChange={() => setTripType('ROUND_TRIP')}
            id='roundTrip'
            defaultValue={searchParams.get('tripType')?.toString()}
          />
           <label htmlFor='roundTrip'>Round Trip</label>
        </div>
      </div>
      <div className='flex h-46 p-3 border-solid '>
        <div className='h-36 p-4 flex m-2 items-center border-2 border-gray rounded-lg'>
          <div className='flex flex-col p-2 m-3'>
            <p className='text-md font-semibold text-gray-500'>From</p>
            <input
              placeholder='Select'
              type='text'
              defaultValue={searchParams.get('sourceAirportIata')?.toString()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSourceAirportIata(e.target.value)}
              className='text-lg uppercase w-32 p-3 border-none outline-none'
              required
            />
          </div>
          <div className='rounded-full border-2 p-2 border-cyan-300 top-2/4 right-2/4'>
            <FaArrowRightArrowLeft className=' top-2/4' color='skyblue' />
          </div>
          <div className='flex flex-col m-3 p-2'>
            <p className='text-md font-semibold text-gray-500'>To</p>
            <input
              placeholder='Select'
              type='text'
              required
              defaultValue={searchParams.get('destinationAirportIata')?.toString()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDestinationAirportIata(e.target.value)}
              className='text-lg  uppercase w-32 p-3 border-none outline-none'
            />
          </div>
        </div>
        <div className='h-36 p-4 flex m-2 border-2 border-gray rounded-lg'>
          <div className='flex flex-col w-52 gap-2 p-2 border-r-4 ' >
            <p className='text-md font-semibold text-gray-500'>Depart</p>
            <DatePicker
              selected={departDate}
              onChange={(date : any) => setDepartDate(date)}
              dateFormat='dd MMMM yyyy'
              className='text-lg  bg-transparent cursor-pointer font-bold outline-none'
            />
            <p className='text-gray-600 font-semibold'>
              {departDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
          </div>
          <div className='flex w-52  flex-col p-2 gap-2'>
            <p className='text-md font-semibold text-gray-500'>Return</p>
            {tripType === 'ROUND_TRIP' ? 
            <><DatePicker
                selected={returnDate}
                onChange={(date: any) => setReturnDate(date as Date)}
                dateFormat='dd MMMM yyyy'
                className='text-lg font-bold bg-transparent overflow-hidden  cursor-pointer outline-none' />
                <p className='text-gray-600 font-semibold'>
                  {returnDate.toLocaleDateString('en-US', { weekday: 'long' })}
                </p></>
               : 
            <p onClick={() => setTripType('ROUND_TRIP')}>Select Return Date </p>
          }
          </div>
        </div>
        <div
          className='h-36 flex flex-col p-4 m-2 w-full border-2 border-gray cursor-pointer rounded-lg '
          onClick={() => setContainer(!container)}>
          <div className='relative'>
            <div className='flex w-44 flex-col gap-3'>
              <p className='text-md font-semibold text-gray-500'>Passenger</p>
              <p className='text-lg font-bold'>{searchParams.get('selectedPassengers')?.toString() ? searchParams.get('selectedPassengers')?.toString()  : selectedPassengers} Guest</p>
              <p className='text-gray-600 font-semibold'>{searchParams.get('selectedPassengers')?.toString() ? searchParams.get('selectedClass')?.toString()  : selectedClass} Class</p>
            </div>
            {container && (
              <div className='absolute right-0 flex gap-3 p-4 flex-col mt-2 bg-white border border-gray rounded shadow-md'>
                <p>Passenger</p>
                <div className= 'flex  gap-3'
                 >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                    <ul
                    key={count}
                    className= 'flex' >
                    <li  className={clsx(
                      'p-1 rounded',
                      {
                        'bg-cyan-300 text-white ' : count === selectedPassengers
                      }
                      )}
                       onClick={() => setSelectedPassengers(count)}>
                      {count}
                       </li>
                  </ul>
                ))}
              </div>
              <p>children</p>
              <div className='flex gap-3 '>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                  <ul
                    key={count}
                    className='cursor-pointer flex '
                  >
                    <li className={clsx(
                      'p-1 rounded',
                      {
                        'bg-cyan-300 text-white ' : count === selectedChildren
                      }
                      )}
                       onClick={() => setSelectedChildren(count)}>
                      {count}
                    </li>
                  </ul>
                ))}
              </div>
              <p>Class</p>
              <div className='flex gap-3 rounded border-2 '>
                {['PREMIUM_ECONOMY', 'ECONOMY', 'FIRST', 'BUSINESS'].map((className) => (
                  <div
                    key={className}
                    className='cursor-pointer flex'
                    onClick={() => setSelectedClass(className)}
                  >
                    <li className={clsx(
                      'p-1 rounded list-none border-1  border-gray-400',
                      {
                        'bg-cyan-300 text-white ' : className === selectedClass
                      }
                      )}
                       onClick={() => setSelectedClass(className)}>
                      {className}
                    </li>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className='self-center' onClick={handleSearch}>
        <Button  />
    </div> 
  </div>
);
};

export default Search;
