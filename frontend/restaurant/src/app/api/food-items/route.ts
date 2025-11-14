import { NextRequest, NextResponse } from 'next/server';

const NGINX_URL = process.env.NGINX_URL ?? 'http://nginx';
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL ?? 'http://restaurant-service:5002';
const USE_NGINX_PROXY = process.env.USE_NGINX_PROXY === 'true';

const BASE_URL = USE_NGINX_PROXY ? NGINX_URL : RESTAURANT_SERVICE_URL;

export async function GET(request: NextRequest) {
  const url = `${BASE_URL}/api/food-items/`;
  
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
