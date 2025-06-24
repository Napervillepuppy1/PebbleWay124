
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.1'
import { Resend } from 'npm:resend@4.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

interface EmailRequest {
  to: string
  subject: string
  html: string
  type: 'confirmation' | 'password_reset'
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { to, subject, html, type }: EmailRequest = await req.json()

    console.log(`Sending ${type} email to: ${to}`)

    const { data, error } = await resend.emails.send({
      from: 'PebbleWay <noreply@yourdomain.com>',
      to: [to],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('Email sent successfully:', data)
    return new Response(
      JSON.stringify({ success: true, id: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
