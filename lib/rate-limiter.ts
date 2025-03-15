// Minimal version of rate-limiter.ts with just the necessary exports
// This is a stub file to satisfy imports in other files

// Function to clear the entire rate limit store (for development)
export function clearRateLimitStore(): void {
  console.log("Rate limit store cleared (stub function)")
}

// Function to check if rate limiting should be applied
export function shouldApplyRateLimit(): boolean {
  return false // Always return false to disable rate limiting
}

// Stub for rate limit result
export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetAt: Date
  message?: string
}

// Stub for rate limit config
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

// Stub function for rate limiting that always succeeds
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 15 * 60 * 1000, maxRequests: 100 },
): RateLimitResult {
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests,
    resetAt: new Date(Date.now() + config.windowMs),
  }
}

// Function to reset rate limit for a specific identifier
export function resetRateLimit(identifier: string): void {
  console.log(`Rate limit reset for ${identifier} (stub function)`)
}

