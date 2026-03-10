import Razorpay from 'razorpay';

export interface Env {
	RAZORPAY_KEY_ID: string;
	RAZORPAY_KEY_SECRET: string;
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
		const url = new URL(request.url);

		// CORS Headers
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		try {
			// Contact Form / Leads
			if (url.pathname === '/api/contact' && request.method === 'POST') {
				const body = await request.json() as any;
				
				// In a real worker with Drizzle/Hyperdrive, we'd save to DB here
				// For now, we simulate success as the primary goal is the mailto redirect on frontend
				console.log('Received contact form:', body);

				return new Response(JSON.stringify({ success: true, message: 'Contact saved' }), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// Payments: Create Order
			if (url.pathname === '/api/create-order' && request.method === 'POST') {
				const body = await request.json() as any;
				const { planName, amount } = body;

				const instance = new Razorpay({
					key_id: env.RAZORPAY_KEY_ID,
					key_secret: env.RAZORPAY_KEY_SECRET,
				});

				const options = {
					amount: Math.round(amount * 100), // amount in the smallest currency unit
					currency: "INR",
					receipt: `receipt_${Date.now()}`,
				};

				const order = await instance.orders.create(options);

				return new Response(JSON.stringify({
					orderId: order.id,
					key: env.RAZORPAY_KEY_ID,
					amount: order.amount,
					currency: order.currency,
				}), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			return new Response('Not Found', { status: 404, headers: corsHeaders });
		} catch (error: any) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
