import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = await params

  // Supprimer d'abord les items liés
  await prisma.shoppingListsItems.deleteMany({
    where: { shoppingListsID: parseInt(id) }
  })

  // Ensuite supprimer la liste
  const list = await prisma.shoppingList.delete({
    where: { id: parseInt(id) }
  })

  return NextResponse.json(list)
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