import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const savingGoals = await prisma.savingGoals.findMany()
  return NextResponse.json(savingGoals)
}

export async function POST(request) {
  const body = await request.json()
  
  const savingGoal = await prisma.savingGoals.create({
    data: {
      libelle: body.libelle,
      montant: body.montant,
      date_cible: new Date(body.date),
      type: body.type,
      userId: body.userId
    }
  })
  
  return NextResponse.json(savingGoal)
}