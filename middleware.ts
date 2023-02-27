import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export default function middleware(req : NextRequest) { 
    const token = req.cookies.get('token')

    if (token && req.url.includes('/login')) {
        return NextResponse.redirect('http://localhost:3000/')
      }

    if (token && req.url.includes('/signup')) {
        return NextResponse.redirect('http://localhost:3000/')
      }

      if (!token && req.url === 'http://localhost:3000/') {
        return NextResponse.redirect('http://localhost:3000/login')
      }

      if (!token && req.url.includes('/add-product')) {
        return NextResponse.redirect('http://localhost:3000/login')
      }

      if (!token && req.url.includes('/edit-product')) {
        return NextResponse.redirect('http://localhost:3000/login')
      }
}