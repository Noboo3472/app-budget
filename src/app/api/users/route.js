import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  const body = await request.json()
  
  const user = await prisma.user.create({
    data: {
      login: body.login,
      email: body.email,
      password: body.password
    }
  })
  
  return NextResponse.json(user)
}