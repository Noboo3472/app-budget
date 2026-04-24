import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const shoppingListItems = await prisma.shoppingListsItems.findMany()
  return NextResponse.json(shoppingListItems)
}

export async function POST(request) {
  const body = await request.json()
  
  const shoppingListItems = await prisma.shoppingListsItems.create({
    data: {
      libelle: body.libelle,
      montant: body.montant,
      quantite : body.quantite,
      cocher: body.cocher,
      shoppingListsID: body.shoppingListsID
    }
  })
  
  return NextResponse.json(shoppingListItems)
}