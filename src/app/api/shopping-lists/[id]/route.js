import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = await params
  
  const shoppingList = await prisma.shoppingList.delete({
    where: { id: parseInt(id) }
  })
  
  return NextResponse.json(shoppingList)
}