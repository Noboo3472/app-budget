import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = await params
  
  const shoppingListItems = await prisma.shoppingListsItems.delete({
    where: { id: parseInt(id) }
  })
  
  return NextResponse.json(shoppingListItems)
}
export async function PATCH(request, { params }) {
  const { id } = await params
  const body = await request.json()

  const item = await prisma.shoppingListsItems.update({
    where: { id: parseInt(id) },
    data: { cocher: body.cocher }
  })

  return NextResponse.json(item)
}