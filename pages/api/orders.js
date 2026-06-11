// Next.js API route: /api/orders
let ordersList = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(ordersList);
  } else if (req.method === 'POST') {
    const newOrder = {
      ...req.body,
      id: `MM-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    ordersList.push(newOrder);
    res.status(201).json({ success: true, order: newOrder });
  } else if (req.method === 'PUT') {
    const { id, status } = req.body;
    const orderIndex = ordersList.findIndex(o => o.id === id);
    if (orderIndex > -1) {
      ordersList[orderIndex].status = status;
      res.status(200).json({ success: true, order: ordersList[orderIndex] });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
