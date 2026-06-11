// Next.js API route: /api/discounts
let discountCodes = [
  { code: 'LUXURY10', rate: 0.10, desc: '10% off on all fine jewelry items' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(discountCodes);
  } else if (req.method === 'POST') {
    const { code, rate, desc } = req.body;
    const exists = discountCodes.some(d => d.code === code.toUpperCase());
    if (exists) {
      res.status(400).json({ success: false, error: 'Coupon code already exists' });
    } else {
      const newDiscount = { code: code.toUpperCase(), rate: parseFloat(rate), desc };
      discountCodes.push(newDiscount);
      res.status(201).json({ success: true, discount: newDiscount });
    }
  } else if (req.method === 'DELETE') {
    const { code } = req.query;
    discountCodes = discountCodes.filter(d => d.code !== code.toUpperCase());
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
