import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const incomes = await prisma.income.findMany()
  return NextResponse.json(incomes)
}

export async function POST(request) {
  const body = await request.json()
  
  const income = await prisma.income.create({
    data: {
      libelle: body.libelle,
      montant: body.montant,
      date: new Date(body.date),
      type: body.type,
      recurrence: body.recurrence,
      userId: body.userId
    }
  })
  
  return NextResponse.json(income)
}