import { NextRequest, NextResponse } from 'next/server';

const NGINX_URL = process.env.NGINX_URL ?? 'http://nginx';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL ?? 'http://order-service:5005';
const USE_NGINX_PROXY = process.env.USE_NGINX_PROXY === 'true';

const BASE_URL = USE_NGINX_PROXY ? NGINX_URL : ORDER_SERVICE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const url = `${BASE_URL}/api/orders/${path}`;
  
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
  const url = `${BASE_URL}/api/orders/${path}`;
  
  const token = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');
  
  let body;
  if (contentType?.includes('multipart/form-data')) {
    body = await request.formData();
  } else {
    body = await request.text();
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': token ?? '',
      ...(contentType && !contentType.includes('multipart/form-data') 
        ? { 'Content-Type': contentType } 
        : {}),
    },
    body,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const url = `${BASE_URL}/api/orders/${path}`;
  
  const token = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');
  
  let body;
  if (contentType?.includes('multipart/form-data')) {
    body = await request.formData();
  } else {
    body = await request.text();
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': token ?? '',
      ...(contentType && !contentType.includes('multipart/form-data') 
        ? { 'Content-Type': contentType } 
        : {}),
    },
    body,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.path ? resolvedParams.path.join('/') : '';
  const url = `${BASE_URL}/api/orders/${path}`;
  
  const token = request.headers.get('authorization');

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': token ?? '',
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
