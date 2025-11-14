import { NextRequest, NextResponse } from 'next/server';

const NGINX_URL = process.env.NGINX_URL ?? 'http://nginx';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL ?? 'http://order-service:5005';
const USE_NGINX_PROXY = process.env.USE_NGINX_PROXY === 'true';

const BASE_URL = USE_NGINX_PROXY ? NGINX_URL : ORDER_SERVICE_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `${BASE_URL}/api/orders${queryString ? `?${queryString}` : ''}`;
  
  const token = request.headers.get('authorization');
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': token ?? '',
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest) {
  const url = `${BASE_URL}/api/orders`;
  const token = request.headers.get('authorization');
  const body = await request.text();
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': token ?? '',
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
