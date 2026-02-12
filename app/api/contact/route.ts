import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);


const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

// Clean up expired entries periodically to prevent memory growth
function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, record] of rateLimit.entries()) {
    if (now > record.resetTime) {
      rateLimit.delete(ip);
    }
  }
}

function getClientIp(req: NextRequest): string {
  // Check various headers for the real IP (behind proxies/load balancers)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record || now > record.resetTime) {
    // First request or window expired - start new window
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  // Increment count
  record.count++;
  return false;
}

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 5000) // Limit length
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, ""); // Remove remaining angle brackets
}

// Basic validation for suspicious content
function containsSuspiciousContent(text: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /onclick/i,
    /onerror/i,
    /http[s]?:\/\/[^\s]+/gi, // More than 3 URLs is suspicious
  ];
  
  // Check for script injection patterns
  for (const pattern of suspiciousPatterns.slice(0, 4)) {
    if (pattern.test(text)) return true;
  }
  
  // Check for excessive URLs (common in spam)
  const urlMatches = text.match(suspiciousPatterns[4]);
  if (urlMatches && urlMatches.length > 3) return true;
  
  return false;
}

export async function POST(req: NextRequest) {
  // Cleanup expired rate limit entries (runs occasionally, not every request)
  if (Math.random() < 0.1) cleanupRateLimit(); // 10% chance per request

  // Rate limiting check
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const formData = await req.formData();

  // Honeypot check (server-side backup)
  const honeypot = formData.get("website");
  if (honeypot) {
    // Silently reject but return success to confuse bots
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Timestamp validation - reject if form was submitted too quickly
  const timestamp = formData.get("_timestamp");
  if (timestamp) {
    const formLoadTime = parseInt(timestamp.toString(), 10);
    const timeTaken = Date.now() - formLoadTime;
    if (timeTaken < 2000) {
      // Less than 2 seconds - likely a bot
      return NextResponse.json({ success: true }, { status: 200 });
    }
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Sanitize inputs
  const sanitizedName = sanitizeInput(name.toString());
  const sanitizedEmail = sanitizeInput(email.toString());
  const sanitizedMessage = sanitizeInput(message.toString());

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedEmail)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Check for suspicious content
  const fullContent = `${sanitizedName} ${sanitizedMessage}`;
  if (containsSuspiciousContent(fullContent)) {
    return NextResponse.json(
      { error: "Message contains suspicious content" },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "Contact <onboarding@resend.dev>",
      to: ["jl.lynch9@gmail.com"],
      subject: `New message from ${sanitizedName}`,
      replyTo: sanitizedEmail,
      text: sanitizedMessage,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
