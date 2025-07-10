import { prisma } from "@/db/db.config";
import { verifyTokenSession } from "@/lib/verify-token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(){
    try {

         await prisma.listing.createMany({
    data: [
      {
        title: 'Hyundai i20 Asta',
        description: 'Well maintained with AC and power steering',
        location: 'Delhi',
        pricePerDay: 1500,
        userId: 1,
        submittedBy: 'user1@example.com',
        status: 'pending'
      },
      {
        title: 'Maruti Swift Dzire',
        description: 'Fuel efficient and perfect for city driving',
        location: 'Mumbai',
        pricePerDay: 1200,
        userId: 1,
        submittedBy: 'user2@example.com',
        status: 'pending'
      },
      {
        title: 'Honda City ZX',
        description: 'Spacious and comfortable for long road trips',
        location: 'Bangalore',
        pricePerDay: 1800,
        userId: 1,
        submittedBy: 'user3@example.com',
        status: 'pending'
      },
      {
        title: 'Toyota Innova Crysta',
        description: 'Ideal for family travel and long journeys',
        location: 'Chennai',
        pricePerDay: 2200,
        userId: 1,
        submittedBy: 'user4@example.com',
        status: 'pending'
      },
      {
        title: 'Tata Nexon EV',
        description: 'Electric car with modern features and great range',
        location: 'Pune',
        pricePerDay: 2000,
        userId: 1,
        submittedBy: 'user5@example.com',
        status: 'pending'
      },
      {
        title: 'Mahindra Thar',
        description: 'Rugged SUV for off-road adventures',
        location: 'Jaipur',
        pricePerDay: 2500,
        userId: 1,
        submittedBy: 'user6@example.com',
        status: 'pending'
      },
      {
        title: 'Renault Kwid',
        description: 'Compact and economical car for short trips',
        location: 'Kolkata',
        pricePerDay: 1000,
        userId: 1,
        submittedBy: 'user7@example.com',
        status: 'pending'
      },
      {
        title: 'Skoda Rapid',
        description: 'Smooth ride with premium features',
        location: 'Hyderabad',
        pricePerDay: 1600,
        userId: 1,
        submittedBy: 'user8@example.com',
        status: 'pending'
      },
      {
        title: 'Ford EcoSport',
        description: 'Compact SUV with good mileage',
        location: 'Ahmedabad',
        pricePerDay: 1700,
        userId: 1,
        submittedBy: 'user9@example.com',
        status: 'pending'
      },
      {
        title: 'Volkswagen Polo',
        description: 'Reliable hatchback with sporty performance',
        location: 'Lucknow',
        pricePerDay: 1400,
        userId: 1,
        submittedBy: 'user10@example.com',
        status: 'pending'
      }
    ]
    });
    return new Response('Listings created', { status: 201 });   
}catch (error) {
        console.error('Error creating listings:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {

         const userId = await verifyTokenSession(req)

    if(!userId){
        return NextResponse.json({message : "Unauthorize access"}, {status : 401})
    }
    const response = await prisma.listing.findMany({
        where : {
            userId : Number(userId),
        }
    })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error('Error fetching listings:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {

        const userId = await verifyTokenSession(req)
    if(!userId){
        return NextResponse.json({message : "Unauthorize access"}, {status : 401
})
    }
        const { id } = await req.json();
        
        if (!id) {
            return new Response('ID is required', { status: 400 });
        }
        await prisma.listing.delete({
            where: { id: Number(id), userId: Number(userId) }
        });
        return new Response('Listing deleted', { status: 200 });
    } catch (error) {
        console.error('Error deleting listing:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    
    const userId = await verifyTokenSession(req);
    if (!userId) {
      return new Response("Unauthorized access", { status: 401 });
    }
    
    if (!id) {
      return new Response("Missing listing ID", { status: 400 });
    }

    const allowedFields = [
      "title",
      "description",
      "location",
      "pricePerDay",
      "submittedBy",
      "status"
    ];

    const dataToUpdate: Record<string, any> = {};

    for (const key of allowedFields) {
      if (key in updateData) {
        const value = updateData[key];

        if (value === undefined || value === null || value === "") {
          continue; 
        }

        dataToUpdate[key] = value;
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return new Response("No valid fields provided to update", { status: 400 });
    }

    const updatedListing = await prisma.listing.update({
      where: { id: Number(id), userId: Number(userId) },
      data: dataToUpdate
    });

    return new Response(JSON.stringify(updatedListing), { status: 200 });
  } catch (error) {
    console.error("Error updating listing:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}