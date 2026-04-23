import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const expenses = await prisma.expense.findMany()
  return NextResponse.json(expenses)
}

export async function POST(request) {
  const body = await request.json()
  
  const expense = await prisma.expense.create({
    data: {
      libelle: body.libelle,
      montant: body.montant,
      date: new Date(body.date),
      type: body.type,
      recurrence: body.recurrence,
      userId: body.userId
    }
  })
  
  return NextResponse.json(expense)
}