import { NextRequest, NextResponse } from 'next/server';

const NGINX_URL = process.env.NGINX_URL ?? 'http://nginx';
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL ?? 'http://restaurant-service:5002';
const USE_NGINX_PROXY = process.env.USE_NGINX_PROXY === 'true';

const BASE_URL = USE_NGINX_PROXY ? NGINX_URL : RESTAURANT_SERVICE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `${BASE_URL}/api/reports/${path}${queryString ? `?${queryString}` : ''}`;
  
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const url = `${BASE_URL}/api/reports/${path}`;
  
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
