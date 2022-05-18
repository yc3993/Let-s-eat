import React, { useEffect } from "react";

function test() {   
    function showPosition(position) {
        console.log(position.coords.longitude)
      }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          
        }
      }
  return (
    <div>
      <button onClick={getLocation()}>Get location</button>
      
      <a href="https://mail.google.com/chat/u/0/#chat/welcome"><button>test</button></a>
    
      
    </div>
  )
}

export default test
