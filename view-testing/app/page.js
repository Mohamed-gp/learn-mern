"use client"

import { useEffect, useState } from "react"



export default function Home() {
  const [sliderIndex, setsliderIndex] = useState(0)
  console.log(sliderIndex)

  const changeSliderIndex= (direction) => {
    if (direction == "to-left") {
      setsliderIndex(e => e - 1)
      setcurrentcard(e => e + 1)
    }
    else{
      setsliderIndex(e => e + 1)
      setcurrentcard(e => e - 1)

    }
    
  }
  useEffect(() => {
    const cards = document.querySelectorAll(".card")
    cards.forEach(card => {
      card.classList.add("opacity-70")
      card.classList.remove("scale-x-150")
    })
    cards[sliderIndex + 1].classList.add("scale-x-150")
    cards[sliderIndex + 1].classList.remove("opacity-70")
  },[sliderIndex])

  return (
    <>
      <div className="w-screen  h-screen scale-x flex items-center flex-col justify-center">
        <div className="slider  container" >
          <div className="slider-wrapper  h-[200px] relative">
            <div className="cart w-fit absolute justify-center duration-1000 left-1/2  flex gap-8" style={{ transform: `translateX(calc(-50% - ${sliderIndex *300}px))` }}>
              <div className="card duration-1000 w-[200px] h-[200px] bg-blue-300"></div>
              <div className="card duration-1000 w-[200px] h-[200px] bg-blue-300 "></div>
              <div className="card duration-1000 w-[200px] h-[200px] bg-blue-300"></div> 
              {/*
              <div className="card w-[300px] h-16 bg-blue-300"></div>
              <div className="card w-[300px] h-16 bg-blue-300"></div>
              <div className="card w-[300px] h-16 bg-blue-300"></div> */}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4  mt-16">
          <button className="w-fit px-4 py-1 rounded-lg bg-blue-600 text-white font-bold " disabled={sliderIndex == -1} onClick={() => changeSliderIndex("to-left")}>to left </button>
          <button className="w-fit px-4 py-1 rounded-lg bg-blue-600 text-white font-bold " disabled={sliderIndex == 1} onClick={() => changeSliderIndex("to-right")}>to right </button>
        </div>
      </div>
    </>
  )
}
