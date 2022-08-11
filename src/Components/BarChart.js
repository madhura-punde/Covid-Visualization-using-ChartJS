import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'
import '../index.css'


function BarChart() {

    const[statewise, setstatewise] = useState([])
    const [newData, setnewData] = useState([])
    const [Maharashtra, setMaharshtra] = useState({})

   const [active1, setactive1] = useState([])
    const [recovered, setRecovered] = useState([])
    const [states, setStates] = useState([])
    const [deathCount, setdeathCount] = useState([])

    let DoughnutChartData = []

    useEffect(()=>{
        axios
        .get('https://data.covid19india.org/data.json')
        .then(response=>{
            //console.log(response.data.statewise)
            setstatewise(response.data.statewise)

            const data1= response.data.statewise.map(({ active, recovered,deaths, state }) => {
                // weather is an array of length 1, but still provide fallback

                //console.log(active)
                //console.log(recovered)
                //console.log(state)
              return{
                active,
                recovered,
                state,
                deaths
            }
              });
             setnewData(data1)

             console.log("-------------------maha Doughtnut Chart---------")
             const data2 = response.data.statewise.filter(({state})=>{
                if(state ==='Maharashtra') {
                 return state
                }
               })
               

             console.log(data2) 
             setMaharshtra(data2)
            //  DoughnutChartData = [Maharashtra[0].deaths, Maharashtra[0].active, Maharashtra[0].recovered ]
            //  console.log(DoughnutChartData)     
     

             console.log("-------------------Bar chart---------")
             //Getting Active count and set state
             let result1 = data1.map(({ active }) => active)
             result1 = result1.slice(11,16)
             setactive1(result1)

             //getting recovered count and set state
              let result2 = data1.map(({recovered})=> recovered)
              result2 = result2.slice(11,16)
             setRecovered(result2)

             //getting states count and setting respective state
             let result3 = data1.map(({state})=> state)
             result3 = result3.slice(11,16)
             setStates(result3)

             //geting deaths count and set state for that
             let result4 = data1.map(({deaths})=>deaths)
             result4 = result4.slice(11,16)
             setdeathCount(result4)
   
        })

        .catch(error=>{
            console.log(error)
        })

    },[])


// -------------------BAR CHART RELATED FUNCTIONS OR VARS--------------

const data = {
    labels : states,
    datasets : [
        {
            label: 'Active patients',
            data : active1
      
          },
      {
        label : 'Recovered patients',
        data :recovered,
        borderColor :['rgba(255, 206, 86, 0.2)'],
        backgroundColor : ['rgba(255, 206, 86, 0.2)'],
        pointBackgroundColor :'rgba(255, 206, 86, 0.2)',
        pointBorderColor :'rgba(255, 206, 86, 0.2)'
      },
     
      {
        label : 'Death Count',
        data : deathCount
      }
    ]
  }


  const options1 ={
    type :'bar',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title : {
      display : true,
      text:'Statewise Covid Data-2021 Feb',
      fontSize:20
      
    }},
    scales:{
      y : {
          id: 'y',
        tick:{
          type: 'bar',
          min:1000000,
          max: 600000,
          stepsize: 10000}
      }}
  }
//  ---------------------DoughNUT CHART settings----------------


const dataD = {
    labels : states,
    datasets : [
      {
        label : 'Covid DATA in Doughnut Chart',
        data : recovered,
        borderColor :['rgba(255, 206, 86, 0.2)'],
        backgroundColor : [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54,162,235,1)',
          'rgba(255,159,64,1)',
          'rgba(153,102,255,1)'
      
      ],
        pointBackgroundColor :'rgba(255, 206, 86, 0.2)',
        pointBorderColor :'rgba(255, 206, 86, 0.2)'
      }
    ]
  }

  const optionsD ={
    type :'doughnut',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title : {
      display : true,
      text:'Statewise Covid Data for Recovered Patients-2021 Feb-Doughnut Chart',
      fontSize:20
      
    }}
  }

  return (
    
    <div className='customeclass'>

        {/* {console.log(statewise)} */}
        {console.log(active1)}
        {console.log(recovered)}
        {console.log(states)}
        {console.log("----------")}
        {console.log(deathCount)}
        {/* Doughnut Chart Data */}
        
        
       

        <Bar data = {data} options={options1}/>
       

        <Doughnut data = {dataD} options= {optionsD} /> 
        
      
    
    </div>
  )
}

export default BarChart
