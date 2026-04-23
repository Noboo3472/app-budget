import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const shoppingLists = await prisma.shoppingList.findMany()
  return NextResponse.json(shoppingLists)
}

export async function POST(request) {
  const body = await request.json()
  
  const shoppingList = await prisma.shoppingList.create({
    data: {
      libelle: body.libelle,
      date: new Date(body.date),
      userId: body.userId
    }
  })
  
  return NextResponse.json(shoppingList)
}