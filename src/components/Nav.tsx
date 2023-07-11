import React from "react";
export const Nav = () => {
 return(
   <div className="pl-20 grid grid-cols-2 row-1 shadow -mb-2 shadow-white" style={{gridTemplateColumns:'400px 1fr'}}>
  <div className="logo" >
    <div className=""><h3 className="pl-10 m-1 p-1 text-xl italic"  ><span className="text-5xl">አ</span>ደራጀው</h3> </div>
  </div>
  <div className="m-4 p-4  ">
    <ul className="flex items-center gap-20">
      <li><a href="home" className="text-white-500 hover:text-white-700">Home</a></li>
      <li><a href="about" className="text-white-500 hover:text-white-700">About</a></li>
      <li><a href="service" className="text-white-500 hover:text-white-700">Service</a></li>
    </ul>
  </div>
</div>
 );
}