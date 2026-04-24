import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = await params

  await prisma.shoppingListsItems.deleteMany({
    where: { shoppingListsID: parseInt(id) }
  })

  const list = await prisma.shoppingList.delete({
    where: { id: parseInt(id) }
  })

  return NextResponse.json(list)
}