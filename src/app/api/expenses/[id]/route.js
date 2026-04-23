import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request, { params }) {
  const { id } = await params
  
  const expense = await prisma.expense.delete({
    where: { id: parseInt(id) }
  })
  
  return NextResponse.json(expense)
}