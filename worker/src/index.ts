import Razorpay from 'razorpay';

export interface Env {
	RAZORPAY_KEY_ID: string;
	RAZORPAY_KEY_SECRET: string;
	DATABASE_URL: string;
}

const SANITY_CONFIG = {
	projectId: "scuuz9jw",
	dataset: "production",
	apiVersion: "2024-03-10",
};

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
				console.log('Received contact form:', body);
				return new Response(JSON.stringify({ success: true, message: 'Contact saved' }), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// Validate Coupon
			if (url.pathname === '/api/validate-coupon' && request.method === 'POST') {
				const { code, amount } = await request.json() as any;
				
				// Fetch coupon from Sanity
				const query = encodeURIComponent(`*[_type == "coupon" && code == "${code}" && isActive == true][0]`);
				const sanityUrl = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;
				
				const response = await fetch(sanityUrl);
				const { result: coupon } = await response.json() as any;

				if (!coupon) {
					return new Response(JSON.stringify({ valid: false, message: 'Invalid or inactive coupon' }), {
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					});
				}

				let finalAmount = amount;
				if (coupon.discountType === 'percentage') {
					finalAmount = amount * (1 - coupon.value / 100);
				} else if (coupon.discountType === 'flat') {
					finalAmount = Math.max(0, amount - coupon.value);
				}

				return new Response(JSON.stringify({ 
					valid: true, 
					discountedAmount: Math.round(finalAmount),
					discountApplied: amount - finalAmount
				}), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// Payments: Create Order
			if (url.pathname === '/api/create-order' && request.method === 'POST') {
				const body = await request.json() as any;
				const { planName, amount, userName, userEmail, userPhone } = body;

				// Use live keys if available, otherwise fallback (though user provided live keys)
				const keyId = env.RAZORPAY_KEY_ID || "rzp_live_ZDRBsLXKmZI6Gu";
				const keySecret = env.RAZORPAY_KEY_SECRET || "ICeztAUq6hLeCxBgNzIU1awy";

				const instance = new Razorpay({
					key_id: keyId,
					key_secret: keySecret,
				});

				const options = {
					amount: Math.round(amount * 100), // amount in the smallest currency unit
					currency: "INR",
					receipt: `receipt_${Date.now()}`,
					notes: {
						customer_name: userName,
						customer_email: userEmail,
						customer_phone: userPhone,
						plan: planName
					}
				};

				const order = await instance.orders.create(options);

				return new Response(JSON.stringify({
					orderId: order.id,
					key: keyId,
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
