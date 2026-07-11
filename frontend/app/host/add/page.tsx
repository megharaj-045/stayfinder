"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddListing() {

  const router = useRouter();

  const [form, setForm] = useState({
    title:"",
    description:"",
    location:"",
    property_type:"Apartment",
    image_url:"",
    price_per_night:1000,
    bedrooms:1,
    bathrooms:1,
    beds:1,
    max_guests:2,
  });

  async function submit(){

    await fetch("http://localhost:8000/api/v1/listings",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify({

        ...form,

        rating:4.8,
        reviews_count:0,

        wifi:true,
        kitchen:true,
        parking:true,
        pool:false,
        air_conditioning:true,

        host_id:1,

      })

    });

    alert("Listing Added!");

    router.push("/host");

  }

  return(

    <main className="mx-auto max-w-3xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Add Listing
      </h1>

      <div className="space-y-4">

        <input
        placeholder="Title"
        className="w-full border p-3 rounded"
        onChange={(e)=>setForm({...form,title:e.target.value})}
        />

        <textarea
        placeholder="Description"
        className="w-full border p-3 rounded"
        onChange={(e)=>setForm({...form,description:e.target.value})}
        />

        <input
        placeholder="Location"
        className="w-full border p-3 rounded"
        onChange={(e)=>setForm({...form,location:e.target.value})}
        />

        <input
        placeholder="Image URL"
        className="w-full border p-3 rounded"
        onChange={(e)=>setForm({...form,image_url:e.target.value})}
        />

        <input
        type="number"
        placeholder="Price"
        className="w-full border p-3 rounded"
        onChange={(e)=>setForm({...form,price_per_night:Number(e.target.value)})}
        />

        <button

        onClick={submit}

        className="w-full rounded-xl bg-black py-4 text-white"

        >

          Create Listing

        </button>

      </div>

    </main>

  );

}