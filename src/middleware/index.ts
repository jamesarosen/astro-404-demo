import { defineMiddleware } from 'astro:middleware'
import type { MiddlewareHandler } from 'astro'

export const onRequest: MiddlewareHandler = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url)

  if (url.pathname === '/health') {
    const body = `OK at ${new Date()}\n`
    return new Response(body, { headers: { 'content-length': body.length.toString() }})
  }

  const res = await next();
  res.headers.set('astro-debug', `res.status=${res.status}`)
  return res;
})
