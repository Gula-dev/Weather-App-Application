import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [city,setCity]=useState("")
  let [wDetails,setWdetails]=useState()
  let [isLoading,setIsLoading]=useState(false)
  let getData=(event)=>{
    setIsLoading(true)
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
   .then((res)=>res.json())
   .then((finalRes)=>{
  if(finalRes.cod=="404"){
        setWdetails(undefined)
  }else{
          setWdetails(finalRes)
  }
  setIsLoading(false)
    
   })

   
    event.preventDefault()
    setCity("")
  }




  return (
      
   <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
    <div className='max-w-[1320px] mx-auto'>
      <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>

      <form onSubmit={getData}>
        <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] pl-3 ' placeholder='city Name'/><button className='bg-[#0000FF] bg-[#164e63] w-[80px] h-[40px] p1-3 ml-2'>Submit</button>
      </form>
      
  <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

    <img src='https://aiforgood.itu.int/wp-content/uploads/2021/06/loading.gif' width={100} 
    
    className={` absolute left-[50%] ${isLoading ? '' : 'hidden'} `}
    
      />

    {wDetails!==undefined
    ?
    <>
    <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>
    {wDetails.sys.country}
      </span></h3>
    <h2 className='font-bold text-[40px]'>
      {wDetails.main.temp}
    </h2>
    <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />

    <p>
    {wDetails.weather[0].description}
    </p>
    </>
   :
   "No Data found"
    }
  </div>
    </div>

   </div>
  );
}

export default App;
