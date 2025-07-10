import { prisma } from '@/db/db.config';
import { verifyTokenSession } from '@/lib/verify-token';
import { NextRequest } from 'next/server';
export async function PATCH(req: NextRequest) {
    try {
        const { id, status } = await req.json();
        
        const userId = await verifyTokenSession(req);
        if (!userId) {
            return new Response('Unauthorized access', { status: 401 });
        }

        if (!id || !status) {
            return new Response('ID and status are required', { status: 400 });
        }

        await prisma.listing.update({
            where: { id: Number(id), userId: Number(userId) },
            data: { status }
        });

        return new Response('Listing status updated', { status: 200 });
    } catch (error) {
        console.error('Error updating listing status:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}