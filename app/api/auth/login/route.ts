import { NextResponse } from 'next/server';

// Basic in-memory rate limiting map
// Key: IP or identifier, Value: { count, lastAttempt }
const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Simple identifier (in production you might use headers().get('x-forwarded-for'))
    const ip = 'client-ip'; 

    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip) || { count: 0, lastAttempt: now };

    // Reset rate limit if more than 1 minute has passed
    if (now - rateLimit.lastAttempt > 60000) {
      rateLimit.count = 0;
    }

    if (rateLimit.count >= 5) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    rateLimit.count += 1;
    rateLimit.lastAttempt = now;
    rateLimitMap.set(ip, rateLimit);

    // Simulate network delay for effect
    await new Promise((resolve) => setTimeout(resolve, 800));

    const VALID_USER = process.env.NEXUS_USERNAME || '12345';
    const VALID_PASS = process.env.NEXUS_PASSWORD || '950056';

    if (username === VALID_USER && password === VALID_PASS) {
      // Reset rate limit on success
      rateLimitMap.delete(ip);
      return NextResponse.json({ success: true, message: 'Access Granted' });
    } else {
      return NextResponse.json(
        { error: 'Incorrect username or password.' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
