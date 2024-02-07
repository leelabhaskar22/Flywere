import React  from 'react'
import Image from 'next/image'

const Flight = (props : any ) => {
  const { url,departtime, arrivaltime,duration, stops, price ,flightnumber,link,tag } = props; 
  const formatDuration = (minutes : number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    return `${formattedHours} hr ${formattedMinutes} min`;
  };
  
  return (
    <div className='w-full'>
      <div className='flex h-36  rounded-xl bg-white p-3 m-3'>
        <div className='h-full w-36 flex items-center justify-center flex-col rounded-lg border-2 border-r-gray-200'>
          <Image src={url} width={75} height={75} alt='logo'/> 
          <p className='text-gray-600 font-semibold'>{flightnumber}</p>
        </div>
        <div className='mx-auto items-center flex w-full px-11   justify-between'>
          <div className='flex items-center flex-col gap-2'>
            <p className='text-gray-600 font-semibold'>Depart</p>
            <p className='text-black-600 font-bold text-2xl'>{departtime.time}</p>
            <p className='text-black-600 font-semibold'>{departtime.date}</p>
          </div>
          <div className='flex items-center'>
            <p className='w-3 h-3 rounded-full bg-blue-500'></p>
            <p className='text-blue-400'>--------</p>
            <div className='flex relative flex-col items-center justify-end '>
            <p className='w-28 text-center p-1  bg-blue-400 rounded-2xl text-white'> {duration? formatDuration(duration) : <></> }</p>
            <p className='text-gray-500 top-8 absolute font-semibold'>{stops} stops</p>
            </div>
            <p className='text-blue-400'>--------</p>
            <p className='w-3 h-3 rounded-full bg-blue-500'></p>
          </div>
          <div className='flex items-center flex-col gap-2'>
            <p className='text-gray-600 font-semibold'>Arrive</p>
            <p className='text-black-600 font-bold text-2xl'>{arrivaltime.time}</p>
            <p className='text-black-600 font-semibold'>{arrivaltime.date}</p>
          </div>
        </div>
        <div className='w-40 flex items-center px-2 gap-2 border-l-2 border-gray-400 flex-col'>
        {tag ? <p className='bg-green-500  border-l-1 p-1 text-sm rounded text-white'> {tag}</p>  : <></> }
        <p className='text-gray-600 font-semibold'>Price</p>
        <p className='text-black-600 font-bold text-xl'>${price}</p>
        <button className='bg-blue-400 text-white  rounded-lg  px-2 ' ><a target='_blank' href={link}>Book Now</a></button>
        </div>
      </div>
    </div>
  )
}

export default Flight