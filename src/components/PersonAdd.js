import React, { useEffect } from 'react';
import CustomerForm from '../atoms/CustomerForm';
import Nav from '../atoms/Nav';
const PersonAdd = () => {
  

  return (
    <div>
      <Nav/>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-800 py-6 sm:py-12">
      
      <section className="container px-4 mx-auto">
        <CustomerForm/>
      </section>
    </div>
    </div>
    
  );
};

export default PersonAdd;
